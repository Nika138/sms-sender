import { SmsController } from './sms.controller';
import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [FirebaseModule],
  controllers: [SmsController],
  providers: [FirebaseService],
})
export class AppModule {}
