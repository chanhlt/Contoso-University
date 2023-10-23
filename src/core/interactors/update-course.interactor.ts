import { ICourseRepository } from '../repositories/course.repository';
import { NotFoundError } from '../errors/not-found.error';
import { ERROR } from '../errors/error-code';
import { BadRequestError } from '../errors/bad-request.error';
import { ITransaction } from '../transaction';
import { CourseRequestModel } from '../request-models/course.request-model';
import { CourseResponseModel } from '../response-models/course.response-model';

export class UpdateCourseInteractor {
  private readonly courseRepository: ICourseRepository;
  private readonly transaction: ITransaction;

  constructor(courseRepository: ICourseRepository, transaction: ITransaction) {
    this.courseRepository = courseRepository;
    this.transaction = transaction;
  }

  public async execute(id: number | undefined, payload: Partial<CourseRequestModel>): Promise<CourseResponseModel> {
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
      const { name, startDate, endDate } = (await this.courseRepository.findById(id))!;
      await this.transaction.commit();
      return { id, name, startDate, endDate };
    } catch (error) {
      await this.transaction.rollback();
      throw error;
    }
  }

  private isEmpty(payload: Partial<CourseRequestModel>) {
    if (!payload) {
      return true;
    }
    if (Object.keys(payload).length === 0) {
      return true;
    }
    return Object.keys(payload).every((key) => payload[key as keyof CourseRequestModel] === undefined);
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
