import { Student } from "../../../src/core/entities/student.entity";
import { IStudentRepository } from "../../../src/core/repositories/student.repository";

export class MockStudentRepository implements IStudentRepository{

  private readonly _students: Student[] = [];
  createStudent(payload: Omit<Student, "id">): Promise<Student> {
    const student = { ...payload, id: this._students.length+1 };
    this._students.push(student);
    return Promise.resolve(student);
  }
  updateStudent(id: number, payload: Partial<Student>): Promise<Student> {
    const student = this._students.find(std=>std.id === id) as Student;
    Object.assign(student, payload);
    return Promise.resolve(student as Student);
  }
  findStudentByPk(id: number): Promise<Student | null> {
    const student = this._students.find((std) => std.id === id);
    if(!student){
      return Promise.resolve(null);
    }
    return Promise.resolve(student);
  }
  
}

