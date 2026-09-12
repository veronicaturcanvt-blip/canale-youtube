import { ValidationPipe } from '@nestjs/common';

// Scoped to controllers whose DTOs are fully decorated with class-validator
// rules (auth, users) rather than applied app-wide: other modules' DTOs are
// still plain undecorated classes, and whitelist mode strips/rejects any
// property without validation metadata.
export const strictValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
});
