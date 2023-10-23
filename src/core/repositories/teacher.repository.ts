import { Teacher } from '../entities/teacher.entity';

export interface ITeacherRepository {
  create(payload: Teacher): Promise<Teacher>;
}
