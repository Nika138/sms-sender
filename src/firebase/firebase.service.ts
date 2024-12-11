import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import axios from 'axios';

@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          require('../../serviceAccountKey.json'),
        ),
      });
    }
  }

  async sendSMS(phoneNumber: string, message: string): Promise<string> {
    try {
      const messageData = await axios.post('https://textbelt.com/text', {
        phone: phoneNumber,
        message: message,
        key: '255fbb6645650e9a44e56b105659e7adc720a29dq3XQ4FfEqCXRZB7Ni15RgQS1C',
      });

      if (messageData.data.success) {
        return `SMS sent successfully!`;
      } else {
        throw new Error(messageData.data.error);
      }
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }
}
