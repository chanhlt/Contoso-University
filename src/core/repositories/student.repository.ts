import { Student } from "../entities/student.entity";


export interface IStudentRepository {
    createStudent(payload: Omit<Student, 'id'>): Promise<Student>;
    updateStudent(id: number, payload: Omit<Student, 'id'>): Promise<Student>;
    findStudentByPk(id: number): Promise<Student | null>;
}

