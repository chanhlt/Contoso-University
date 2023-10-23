import { ITransaction } from '../../core/transaction';

export class SimpleTransaction implements ITransaction {
  begin(): Promise<void> {
    return Promise.resolve();
  }
  commit(): Promise<void> {
    return Promise.resolve();
  }
  rollback(): Promise<void> {
    return Promise.resolve();
  }
}
