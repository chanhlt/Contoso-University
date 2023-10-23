export class CourseAssignment {
  constructor(
    public id: number | null,
    public courseId: number,
    public teacherId: number,
    public assignedDate: Date
  ) {}
}
