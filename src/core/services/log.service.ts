export interface ILogService {
  debug(message: unknown, customLog?: unknown): void;
  info(message: unknown, customLog?: unknown): void;
  warn(message: unknown, customLog?: unknown): void;
  error(message: unknown, error: unknown, customLog?: unknown): void;
}
