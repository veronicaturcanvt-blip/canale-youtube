import { IsUrl } from 'class-validator';

export class IngestVideoDto {
  // Where Mux should fetch the raw footage from — upload it to any
  // reachable location first (S3/GCS presigned URL, etc.) and pass that
  // URL here. Mux pulls the file itself; it never comes through our server.
  @IsUrl({ require_protocol: true })
  sourceUrl!: string;
}
