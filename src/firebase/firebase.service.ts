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
        key: 'textbelt generated key',
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
