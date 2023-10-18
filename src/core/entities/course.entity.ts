import { BadRequestError } from '../errors/bad-request.error';
import { ERROR } from '../errors/error-code';

export class Course {
  private _id: number | undefined = undefined;
  constructor(
    public readonly name: string,
    public readonly startDate: Date,
    public readonly endDate: Date | undefined
  ) {}

  validate() {
    if (!this.name) {
      throw new BadRequestError(ERROR.COURSE_NAME_IS_REQUIRED);
    }
    if (!this.startDate) {
      throw new BadRequestError(ERROR.COURSE_START_DATE_IS_REQUIRED);
    }
  }

  set id(id: number) {
    this._id = id;
  }

  get id(): number | undefined {
    return this._id;
  }
}
