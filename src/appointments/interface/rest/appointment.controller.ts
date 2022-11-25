import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterAppointmentRequest } from 'src/appointments/application/dtos/request/register-appointment-request.dto';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterAppointmentResponse } from 'src/appointments/application/dtos/response/register-appointment-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetAppointments } from 'src/appointments/application/messages/queries/get-appointments.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentApplicationService } from 'src/appointments/application/services/appointment-application.service';

@Controller('appointments')
@ApiTags('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentApplicationService: AppointmentApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register Appointment' })
  async register(
    @Body() registerAppointmentRequest: RegisterAppointmentRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterAppointmentResponse> = await this.appointmentApplicationService.register(registerAppointmentRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetAppointments());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const appointment = await this.appointmentApplicationService.getById(id);
      return ApiController.ok(response, appointment);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}