import { ERROR } from "./error-code";

export const ERROR_MESSAGE: Record<ERROR, string> = {
    [ERROR.STUDENT_ID_MUST_BE_A_NUMBER]: "Student ID must be a number",
    [ERROR.STUDENT_FIRST_NAME_IS_REQUIRED]: "Student First Name is required"
}

