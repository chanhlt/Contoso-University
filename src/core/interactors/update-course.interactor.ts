import { ICourseRepository } from '../repositories/course.repository';
import { Course } from '../entities/course.entity';
import { NotFoundError } from '../errors/not-found.error';
import { ERROR } from '../errors/error-code';
import { BadRequestError } from '../errors/bad-request.error';
import { ITransaction } from '../transaction';

type UpdateCoursePayload = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
};

export class UpdateCourseInteractor {
  private readonly courseRepository: ICourseRepository;
  private readonly transaction: ITransaction;

  constructor(courseRepository: ICourseRepository, transaction: ITransaction) {
    this.courseRepository = courseRepository;
    this.transaction = transaction;
  }

  public async execute(id: number | undefined, payload: UpdateCoursePayload): Promise<Omit<Course, 'validate'>> {
    id = this.toPositiveInt(id);
    if (!id) {
      throw new NotFoundError(ERROR.COURSE_NOT_FOUND);
    }
    if (this.isEmpty(payload)) {
      throw new BadRequestError(ERROR.COURSE_UPDATE_PAYLOAD_EMPTY);
    }
    try {
      await this.transaction.begin();
      const course = await this.courseRepository.findById(id);
      if (!course) {
        throw new NotFoundError(ERROR.COURSE_NOT_FOUND);
      }
      await this.courseRepository.update(id, payload);
      const updated = await this.courseRepository.findById(id);
      await this.transaction.commit();
      return updated!;
    } catch (error) {
      await this.transaction.rollback();
      throw error;
    }
  }

  private isEmpty(payload: UpdateCoursePayload) {
    if (!payload) {
      return true;
    }
    return Object.keys(payload).length === 0;
  }

  private toPositiveInt(input: number | undefined) {
    if (!input || isNaN(input) || input <= 0) {
      return undefined;
    }
    if (typeof input == 'string') {
      return parseInt(input);
    }
    return input;
  }
}
