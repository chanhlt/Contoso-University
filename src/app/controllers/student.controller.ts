import { RouterContext } from "koa-router";

import { StudentCreateRequestModel, StudentUpdateRequestModel } from "../models/student.model";
import { StudentService } from "../../core/services/student.service";
import { SimpleStudentRepository } from "../repositories/simple.student.repository";

const studentController = {

    create: async (ctx: RouterContext) => {
        const createData = new StudentCreateRequestModel(ctx.request.body);
        const studentRepository = new SimpleStudentRepository();
        const studentService = new StudentService(studentRepository);
        const createdUser = await studentService.createStudent(createData);
        ctx.body = createdUser;
    },

    update: async (ctx: RouterContext) => {
        const studentRepository = new SimpleStudentRepository();
        const studentId = Number(ctx.params.id);
        if (isNaN(studentId)) {
            throw new Error('Student ID must be a number');
        }
        const studentService = new StudentService(studentRepository);
        const currentStudent = await studentService.findStudentByPk(studentId);
        if(!currentStudent) {
            throw new Error('Student does not exist in database')
        }
        const updateData = new StudentUpdateRequestModel(ctx.request.body, currentStudent);
        const updatedStudent = await studentService.updateStudent(studentId, updateData);
        ctx.body = updatedStudent;
    }
}


export default studentController;
