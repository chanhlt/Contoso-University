export class Course {
  constructor(
    public id: number | null,
    public name: string,
    public startDate: Date,
    public endDate?: Date
  ) {}
}
