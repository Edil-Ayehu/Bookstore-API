import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/user/entities/user_entity";
import { ROLES_KEY } from "./roles_decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requeredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);

    if (!requeredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    if(!requeredRoles.includes(user.role)) {
        throw new ForbiddenException("You do not have permission!")
    }

    return true;
    }
}