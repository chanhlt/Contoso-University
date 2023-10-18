import { Student } from '../entities/student.entity';
import { Grade } from '../enums/grade.enum';
import { IStudentRepository } from '../repositories/student.repository';

type CreateStudentPayload = {
  firstName: string;
  lastName: string;
  enrollmentDate: Date;
  grade?: Grade;
};

export class CreateStudentInteractor {
  private readonly studentRepository: IStudentRepository;
  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }

  public execute(payload: CreateStudentPayload): Promise<Omit<Student, 'validate'>> {
    const { firstName, lastName, grade, enrollmentDate } = payload;
    const student = new Student(firstName, lastName, enrollmentDate, grade);
    student.validate();
    return this.studentRepository.create(student);
  }
}
