export class BaseModel<A = any> {
  private readonly _payload: { [key: string]: unknown } = {};
  constructor(payload: unknown) {
    this._payload = payload as { [key: string]: unknown };
  }

  protected get<T>(key: keyof A): T | undefined {
    if (key in this._payload) {
      return this._payload[key as string] as T;
    }
    return undefined;
  }
}
