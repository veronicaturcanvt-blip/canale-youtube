import { IsUUID, Matches } from 'class-validator';

// The mobile client remembers the userId of whoever last logged in with a
// password on this device (e.g. in secure storage), then offers PIN unlock
// as a faster alternative — it never looks up a user by PIN alone.
export class PinLoginDto {
  @IsUUID()
  userId!: string;

  @Matches(/^\d{4,6}$/, { message: 'pin must be 4 to 6 digits' })
  pin!: string;
}
