import { Student } from '../entities/student.entity';
import { BadRequestError } from '../errors/bad-request.error';
import { ERROR } from '../errors/error-code';
import { IStudentRepository } from '../repositories/student.repository';
import { StudentRequestModel } from '../request-models/student.request-model';
import { StudentResponseModel } from '../response-models/student.response-model';

export class CreateStudentInteractor {
  private readonly studentRepository: IStudentRepository;
  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  public async execute(payload: StudentRequestModel): Promise<StudentResponseModel> {
    const student = new Student(null, payload.firstName, payload.lastName, payload.enrollmentDate, payload.grade);
    if (!student.firstName) {
      throw new BadRequestError(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED);
    }
    if (!student.lastName) {
      throw new BadRequestError(ERROR.STUDENT_LAST_NAME_IS_REQUIRED);
    }
    if (!student.enrollmentDate) {
      throw new BadRequestError(ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED);
    }
    const { id, firstName, lastName, enrollmentDate, grade } = await this.studentRepository.create(student);
    return new StudentResponseModel(id!, firstName, lastName, enrollmentDate, grade);
  }
}
