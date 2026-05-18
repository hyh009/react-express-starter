import type { AuthUser } from '@repo/shared';
import type { UserEntity } from '@src/models/user/model';

export function toAuthUser(user: UserEntity): AuthUser {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    roles: [...user.roles],
  };
}
