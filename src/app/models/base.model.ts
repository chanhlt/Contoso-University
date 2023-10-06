export class BaseModel {
  private readonly _payload: { [key: string]: unknown } = {};
  constructor(payload: unknown) {
    this._payload = payload as { [key: string]: unknown };
  }

  protected get<T>(key: string): T | undefined {
    if (key in this._payload) {
      return this._payload[key] as T;
    }
    return undefined;
  }
}
