import { ERROR } from "./error-code";
import { ERROR_MESSAGE } from "./error-message";

export class AppError extends Error {
    private _code: ERROR;
    private _message: string;

    constructor(code: ERROR){
        super(code);
        this._code = code;
        this._message = ERROR_MESSAGE[code];
    }

    get code() {
        return this._code;
    }

    get message() {
        return this._message;
    }
}

