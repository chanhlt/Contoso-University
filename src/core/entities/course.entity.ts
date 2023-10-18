import { ERROR } from '../errors/error-code';

export class Course {
  constructor(
    public readonly name: string,
    public readonly startDate: Date,
    public readonly endDate: Date | undefined
  ) {}

  validate() {
    if (!this.name) {
      throw new Error(ERROR.COURSE_NAME_IS_REQUIRED);
    }
    if (!this.startDate) {
      throw new Error(ERROR.COURSE_START_DATE_IS_REQUIRED);
    }
  }
}
