import { Student } from "../entities/student.entity";
import { AppError } from "../errors/app-error";
import { ERROR } from "../errors/error-code";
import { IStudentRepository } from "../repositories/student.repository";

export class StudentService {
    

    private readonly _studentRepository: IStudentRepository;

    constructor(userRepository: IStudentRepository){
        this._studentRepository = userRepository;
    }

    public createStudent(student: Omit<Student, 'id'>) {
        return this._studentRepository.createStudent(student);
    }

    public updateStudent(id: number, student: Omit<Student, 'id'>) {
        if(isNaN(id)){
            throw new AppError(ERROR.STUDENT_ID_MUST_BE_A_NUMBER)
        }
        return this._studentRepository.updateStudent(id, student);
    }

    public findStudentByPk(id: unknown) {
        return this._studentRepository.findStudentByPk(id as number);
    }
    
}


