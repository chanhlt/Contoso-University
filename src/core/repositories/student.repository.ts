import { Student } from '../entities/student.entity';

export interface IStudentRepository {
  create(student: Student): Promise<Omit<Student, 'validate'>>;
}
