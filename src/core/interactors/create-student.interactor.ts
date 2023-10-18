import { Student } from '../entities/student.entity';
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
    const student = new Student(firstName, lastName, enrollmentDate, grade);
    const createdStudent = await this.studentRepository.create(student);
    return new StudentResponseModel(createdStudent);
  }
}
