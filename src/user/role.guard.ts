import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { UserRoles } from './enum/UserRoles';

const RoleGuard = (): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (UserRoles.ADMIN === user.role) {
        return true;
      }
      const postIds = user.posts.map((post) => post.id);
      return postIds.includes(request.params.id);
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;
