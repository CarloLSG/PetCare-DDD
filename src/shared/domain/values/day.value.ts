import { AppNotification } from '../../application/app.notification';
import { Result } from "typescript-result";


export class Day {
  private readonly value: string;
  private static MAX_LENGTH: number = 8;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Day
  {
    value = (value ?? "").trim();
    return new Day(value);
  }

  public static createResult(value: string): Result<AppNotification, Day>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('day is required', null);
    }
    if (value.length != this.MAX_LENGTH) {
      notification.addError('day field must have ' + Day.MAX_LENGTH + ' characters', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(value) === false) {
      notification.addError('day format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Day(value));
  }
}