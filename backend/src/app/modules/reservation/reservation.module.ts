import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [ReservationController],
  imports: [DatabaseModule, MailModule],
  providers: [ReservationService],
})
export class ReservationModule {}
