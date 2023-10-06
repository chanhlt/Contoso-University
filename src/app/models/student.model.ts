import { BaseModel } from "./base.model";
import { ERROR } from "../../core/errors/error-code";
import { AppError } from "../../core/errors/app-error";

 interface StudentModel {
    id: number;
    firstName: string;
    lastName: string;
    enrollmentDate: Date;
}

export class StudentCreateRequestModel extends BaseModel {

    
    get id() {
        const id = (this.get<number>('id'));
        if(id && isNaN(id)){
            throw new AppError(ERROR.STUDENT_ID_MUST_BE_A_NUMBER)
        }
        return undefined;
    };
    
    get firstName() {
        const firstName= this.get<string>('firstName')
        if(!firstName){
            throw new AppError(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED)
        }
        return firstName;
    };
    

    get lastName() {
        const lastName= this.get<string>('lastName')
        if(!lastName){
            throw new Error('Student Last Name is required')
        }
        return lastName;
    };


    get enrollmentDate() {
        const enrollmentDate = this.get<Date>('enrollmentDate');
        if(!enrollmentDate){
            throw new Error('Student Enrollment Date is required')
        }
        return enrollmentDate;
    };

}



export class StudentUpdateRequestModel extends BaseModel {

    private readonly _currentUser: StudentModel;
    constructor(payload: unknown, currentUser: StudentModel){
        super(payload);
        this._currentUser = currentUser;
    }

    get firstName() {
        const firstName = this.get<string>('firstName') ?? this._currentUser.firstName ;
        if(!firstName){
            throw new Error('Student First Name is required')
        }
        return firstName;
    };
    

    get lastName() {
        const lastName = this.get<string>('lastName') ?? this._currentUser.lastName;
        if(!lastName){
            throw new Error('Student Last Name is required')
        }
        return lastName;
    };


    get enrollmentDate() {
        const enrollmentDate = this.get<Date>('enrollmentDate') ?? this._currentUser.enrollmentDate;
        if(!enrollmentDate){
            throw new Error('Student Enrollment Date is required')
        }
        return enrollmentDate;    
    };

}
