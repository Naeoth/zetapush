import { Email } from '../Email';
import { BaseError } from '@zetapush/common';

export abstract class MessageError extends BaseError {}

export class EmailError extends MessageError {
  constructor(message: string, public email: Email, public cause?: Error) {
    super(message);
  }
}
