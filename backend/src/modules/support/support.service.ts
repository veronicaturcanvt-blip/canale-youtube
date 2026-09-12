import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupportMessageDto } from './dto/create-support-message.dto';

@Injectable()
export class SupportService {
  private readonly logger = new Logger(SupportService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateSupportMessageDto) {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });

    const supportMessage = await this.prisma.supportMessage.create({
      data: { userId, message: dto.message },
    });

    // The message is already durably saved above; a notification failure
    // (unset SMTP, provider outage) should never fail the request itself.
    try {
      await this.notifyAdmin(user.email, dto.message);
    } catch (error) {
      this.logger.error('Failed to send support notification email', error as Error);
    }

    return { id: supportMessage.id, createdAt: supportMessage.createdAt };
  }

  private async notifyAdmin(fromEmail: string, message: string) {
    const to = process.env.SUPPORT_NOTIFICATION_EMAIL;
    const host = process.env.SMTP_HOST;
    if (!to || !host) {
      this.logger.warn(
        'SUPPORT_NOTIFICATION_EMAIL or SMTP_HOST not configured — skipping email, message stays in the DB',
      );
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? 'no-reply@yoga-pilates-app.local',
      to,
      replyTo: fromEmail,
      subject: `New support message from ${fromEmail}`,
      text: message,
    });
  }
}
