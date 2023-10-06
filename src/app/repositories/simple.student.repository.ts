import { Student } from '../../core/entities/student.entity';
import { IStudentRepository } from '../../core/repositories/student.repository';

export class SimpleStudentRepository implements IStudentRepository {
  private _students: Student[] = [];

  private findNextId() {
    let max = 0;
    for (const student of this._students) {
      if (student.id > max) {
        max = student.id;
      }
    }
    return max + 1;
  }

  createStudent(payload: Omit<Student, 'id'>): Promise<Student> {
    const student = { ...payload, id: this.findNextId() };
    this._students.push(student);
    return Promise.resolve(student);
  }

  updateStudent(id: number, payload: Omit<Student, 'id'>): Promise<Student> {
    const student = this._students.find((std) => std.id === id);
    if (!student) {
      throw new Error('Student does not exist in database');
    }
    Object.assign(student, payload);
    return Promise.resolve(student);
  }

  findStudentByPk(id: number): Promise<Student | null> {
    const student = this._students.find((std) => std.id === id);
    return Promise.resolve(student ?? null);
  }
}
