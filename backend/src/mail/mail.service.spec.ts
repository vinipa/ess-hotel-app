import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailService', () => {
  let service: MailService;

  beforeEach(async () => {
    service = new MailService({} as unknown as MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
