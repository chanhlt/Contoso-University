import { AppError } from '../errors/app-error';
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
      throw new AppError(ERROR.COURSE_NAME_IS_REQUIRED);
    }
    if (!this.startDate) {
      throw new AppError(ERROR.COURSE_START_DATE_IS_REQUIRED);
    }
  }

  set id(id: number) {
    this._id = id;
  }

  get id(): number |undefined {
    return this._id;
  }
}
