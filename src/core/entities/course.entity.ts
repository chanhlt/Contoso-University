import { BadRequestError } from '../errors/bad-request.error';
import { ERROR } from '../errors/error-code';

export class Course {
  public id: number | undefined;
  constructor(
    public name: string,
    public startDate: Date,
    public endDate: Date | undefined
  ) {}

  validate() {
    if (!this.name) {
      throw new BadRequestError(ERROR.COURSE_NAME_IS_REQUIRED);
    }
    if (!this.startDate) {
      throw new BadRequestError(ERROR.COURSE_START_DATE_IS_REQUIRED);
    }
  }
}
