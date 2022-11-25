import { AppNotification } from '../../application/app.notification';
import { Result } from "typescript-result";


export class Month {
  private readonly value: string;
  private static MAX_LENGTH: number = 8;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Month
  {
    value = (value ?? "").trim();
    return new Month(value);
  }

  public static createResult(value: string): Result<AppNotification, Month>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('month is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('month field must have ' + Month.MAX_LENGTH + ' characters', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(value) === false) {
      notification.addError('month format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Month(value));
  }
}