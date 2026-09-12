import { IsOptional, IsUrl } from 'class-validator';

// require_protocol rejects bare strings like "not-a-url"; require_tld:false
// still allows http://localhost:3000/... during local development.
const URL_OPTIONS = { require_protocol: true, require_tld: false };

export class CreateCheckoutDto {
  @IsOptional()
  @IsUrl(URL_OPTIONS)
  successUrl?: string;

  @IsOptional()
  @IsUrl(URL_OPTIONS)
  cancelUrl?: string;
}
