import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Usuario } from '.prisma/client';

const AuthUser = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as Usuario;
  delete user.senha;
  return user;
});

export default AuthUser;