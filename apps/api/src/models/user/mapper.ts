import type { AuthUserDto } from '@repo/shared';
import type { UserEntity } from '@src/models/user/model';

export function toAuthUserDto(user: UserEntity): AuthUserDto {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    roles: [...user.roles],
  };
}
