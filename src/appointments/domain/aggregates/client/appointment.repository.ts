import { Appointment } from "./appointment.entity";

export const APPOINTMENT_REPOSITORY = 'AppointmentRepository';

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<Appointment>;
  update(appointment: Appointment): Promise<Appointment>;
  delete(appointmentId: number): Promise<boolean>;
  getById(id: number): Promise<Appointment>;
  getByDay(day: string): Promise<Appointment>;
  getByMonth(month: string): Promise<Appointment>;
  getByYear(year: string): Promise<Appointment>;
}