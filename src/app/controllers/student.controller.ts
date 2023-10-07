import { RouterContext } from 'koa-router';

import { StudentCreateRequestModel, StudentUpdateRequestModel } from '../models/student.model';
import { StudentService } from '../../core/services/student.service';
import { SimpleStudentRepository } from '../repositories/simple.student.repository';

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
    const updateData = new StudentUpdateRequestModel(ctx.request.body);
    const studentService = new StudentService(studentRepository);
    const updatedStudent = await studentService.updateStudent(studentId, updateData);
    ctx.body = updatedStudent;
  }
};

export default studentController;
