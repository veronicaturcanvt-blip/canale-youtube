import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

// A single shared admin login (env-configured), not tied to a User row —
// there's no concept of admin roles yet, and for a solo business owner
// checking a form inbox this is simpler than building one out.
@Injectable()
export class BasicAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password) {
      throw new UnauthorizedException(
        'Admin panel is not configured (set ADMIN_USERNAME/ADMIN_PASSWORD)',
      );
    }

    const header: string | undefined = request.headers?.authorization;
    if (header?.startsWith('Basic ')) {
      const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
      const separatorIndex = decoded.indexOf(':');
      const providedUser = decoded.slice(0, separatorIndex);
      const providedPass = decoded.slice(separatorIndex + 1);
      if (providedUser === username && providedPass === password) {
        return true;
      }
    }

    response.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
    throw new UnauthorizedException('Invalid admin credentials');
  }
}
