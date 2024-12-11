import { Body, Controller, Post } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post('send')
  async sendSMS(@Body() body: { phoneNumber: string; message: string }) {
    const { phoneNumber, message } = body;
    return await this.firebaseService.sendSMS(phoneNumber, message);
  }
}
