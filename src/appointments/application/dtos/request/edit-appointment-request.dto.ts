export class EditAppointmentRequest {
    constructor(
      public readonly day: string,
      public readonly month: string,
      public readonly year: string,
    ) {}
  }