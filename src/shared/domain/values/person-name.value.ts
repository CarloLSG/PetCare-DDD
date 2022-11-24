import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';


export class PersonName {
  private readonly userName: string;
  private static MAX_LENGTH: number = 75;

  private constructor(userName: string) {
    this.userName = userName;
  }

  public getUserName(): string {
    return this.userName;
  }

  public static create(userName: string): PersonName {
    userName = (userName ?? "").trim();
    return new PersonName(userName);
  }

  public static createv2(userName: string): Result<AppNotification, PersonName> {
    let notification: AppNotification = new AppNotification();
    userName = (userName ?? "").trim();
    if (userName === "") {
      notification.addError('firstName is required', null);
    }
    if (userName.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an firstName is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PersonName(userName));
  }
}