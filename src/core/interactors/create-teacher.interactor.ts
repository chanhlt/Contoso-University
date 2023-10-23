import { Teacher } from '../entities/teacher.entity';
import { BadRequestError } from '../errors/bad-request.error';
import { ERROR } from '../errors/error-code';
import { ITeacherRepository } from '../repositories/teacher.repository';
import { TeacherRequestModel } from '../request-models/teacher.request-model';
import { TeacherResponseModel } from '../response-models/teacher.response-model';

export class CreateTeacherInteractor {
  private readonly teacherRepository: ITeacherRepository;
  constructor(teacherRepository: ITeacherRepository) {
    this.teacherRepository = teacherRepository;
  }

  public async execute(payload: TeacherRequestModel): Promise<TeacherResponseModel> {
    const teacher = new Teacher(null, payload.firstName, payload.lastName);
    if (!teacher.firstName) {
      throw new BadRequestError(ERROR.TEACHER_FIRST_NAME_IS_REQUIRED);
    }
    if (!teacher.lastName) {
      throw new BadRequestError(ERROR.TEACHER_LAST_NAME_IS_REQUIRED);
    }
    const { id, firstName, lastName } = await this.teacherRepository.create(teacher);
    return { id: id!, firstName, lastName };
  }
}
