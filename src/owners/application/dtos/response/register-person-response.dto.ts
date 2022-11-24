export class RegisterPersonResponse {
    constructor(
      public id: number,
      public readonly userName: string,
      public readonly email: string,
      public readonly password: string,
      public readonly createdAt: string,
      public readonly createdBy: number
    ) {}
  }