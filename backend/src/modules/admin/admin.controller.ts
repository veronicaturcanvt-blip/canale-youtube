import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ADMIN_PAGE_HTML } from './admin-page.html';
import { BasicAuthGuard } from './basic-auth.guard';

@UseGuards(BasicAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  getPage() {
    return ADMIN_PAGE_HTML;
  }

  @Get('support-messages')
  async getSupportMessages() {
    const messages = await this.prisma.supportMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: { user: { select: { email: true, firstName: true, lastName: true } } },
    });

    return messages.map((message) => ({
      id: message.id,
      createdAt: message.createdAt,
      message: message.message,
      userEmail: message.user.email,
      userName: [message.user.firstName, message.user.lastName].filter(Boolean).join(' ') || null,
    }));
  }
}
