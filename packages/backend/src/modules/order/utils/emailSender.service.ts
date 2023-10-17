import { EmailSenderServiceInterface } from './email-sender.interface';

export default class EmailSenderService implements EmailSenderServiceInterface {
  sendEmail(order: Order): void {
    console.log('Sending order');
  }
}
