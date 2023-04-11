import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserResponse } from './../app/modules/user/interfaces';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserResponse) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Your reservation request has been accepted!',
      template: './test',
      context: {
        name: user.name,
      },
    });
  }
}
