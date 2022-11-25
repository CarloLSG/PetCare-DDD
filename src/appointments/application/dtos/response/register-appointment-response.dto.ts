export class RegisterAppointmentResponse {
    constructor(
      public id: number,
      public readonly day: string,
      public readonly month: string,
      public readonly year: string,
      public readonly createdAt: string,
      public readonly createdBy: number
    ) {}
  }