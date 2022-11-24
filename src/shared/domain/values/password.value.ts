import { AppNotification } from '../../application/app.notification';
import { Result } from "typescript-result";


export class Password {
  private readonly value: string;
  private static MAX_LENGTH: number = 8;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Password
  {
    value = (value ?? "").trim();
    return new Password(value);
  }

  public static createResult(value: string): Result<AppNotification, Password>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('password is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('password field must have ' + Password.MAX_LENGTH + ' characters', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(value) === false) {
      notification.addError('password format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Password(value));
  }
}