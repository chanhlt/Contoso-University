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
    const { firstName, lastName, grade, enrollmentDate } = payload;
    if (!firstName) {
      throw new BadRequestError(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED);
    }
    if (!lastName) {
      throw new BadRequestError(ERROR.STUDENT_LAST_NAME_IS_REQUIRED);
    }
    if (!enrollmentDate) {
      throw new BadRequestError(ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED);
    }
    const student = new Student(firstName, lastName, enrollmentDate, grade);
    const createdStudent = await this.studentRepository.create(student);
    return new StudentResponseModel(createdStudent);
  }
}
