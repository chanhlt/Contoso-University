export class Course {
  public id?: number;
  constructor(
    public name: string,
    public startDate: Date,
    public endDate?: Date
  ) {}
}
