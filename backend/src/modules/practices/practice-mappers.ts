// Mobile clients and query params use lowercase strings ('yoga', 'mat', ...);
// Prisma enums are the uppercase equivalents ('YOGA', 'MAT', ...). Every
// Practice enum follows this same convention, so one pair of helpers covers
// all of them.
export function toEnum<T extends string>(value: string): T {
  return value.toUpperCase() as T;
}

export function fromEnum(value: string): string {
  return value.toLowerCase();
}
