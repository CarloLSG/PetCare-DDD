export class PersonRegistered {
    constructor(
      public readonly id: number,
      public readonly userName: string,
      public readonly email: string,
      public readonly password: string,
    ) {
    }
  }