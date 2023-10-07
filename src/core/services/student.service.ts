import { Student } from '../entities/student.entity';
import { BadRequestError } from '../errors/bad-request.error';
import { ERROR } from '../errors/error-code';
import { NotFoundError } from '../errors/not-found.error';
import { IStudentRepository } from '../repositories/student.repository';

export class StudentService {
  private readonly _studentRepository: IStudentRepository;

  constructor(userRepository: IStudentRepository) {
    this._studentRepository = userRepository;
  }

  public createStudent(student: Omit<Student, 'id'>) {
    if (!student.firstName) {
      throw new BadRequestError(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED);
    }
    if (!student.lastName) {
      throw new BadRequestError(ERROR.STUDENT_LAST_NAME_IS_REQUIRED);
    }
    if (!student.enrollmentDate) {
      throw new BadRequestError(ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED);
    }
    return this._studentRepository.createStudent(student);
  }

  public async updateStudent(id: number, student: Partial<Student>) {
    const currentStudent = await this._studentRepository.findStudentByPk(id);
    if (!currentStudent) {
      throw new NotFoundError(ERROR.STUDENT_DOES_NOT_EXIST);
    }
    return this._studentRepository.updateStudent(id, student);
  }

  public findStudentByPk(id: unknown) {
    return this._studentRepository.findStudentByPk(id as number);
  }
}
