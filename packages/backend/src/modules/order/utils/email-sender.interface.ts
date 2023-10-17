export interface EmailSenderServiceInterface {
  sendEmail(order: Order): void;
}
