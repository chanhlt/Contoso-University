import { Student } from '../entities/student.entity';

export interface IStudentRepository {
  create(payload: Student): Promise<Student>;
}
