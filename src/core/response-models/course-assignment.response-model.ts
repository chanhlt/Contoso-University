export class CourseAssignmentResponseModel {
  constructor(
    public id: number,
    public courseId: number,
    public teacherId: number,
    public assignedDate: Date
  ) {}
}
