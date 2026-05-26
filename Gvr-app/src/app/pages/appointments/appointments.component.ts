import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService, Appointment, ServiceType } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  get currentUser() {
    return this.authService.currentUser;
  }

  appointmentDate = '';
  serviceTypes = '';
  notes = '';
  loading = signal(false);
  error = signal<string | null>(null);
  success = signal<string | null>(null);
  upcoming = signal<Appointment[]>([]);
  past = signal<Appointment[]>([]);
  serviceTypesList = signal<ServiceType[]>([]);

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
    effect(() => {
      const user = this.currentUser();
      if (user) {
        this.loadAppointments(user.userId);
      }
    });

    effect(() => {
      this.loadServiceTypes();
    });
  }

  get isAuthenticated() {
    return !!this.currentUser();
  }

  loadServiceTypes() {
    this.appointmentService.getServiceTypes().subscribe({
      next: (serviceTypes) => {
        // Handle service types if needed
        this.loading.set(true);
        this.error.set(null);
        this.serviceTypesList.set(serviceTypes);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load service types. Please try again.');
        console.error(err);
      }
    });
  }

  loadService(userId: number) {
    this.loading.set(true);
    this.error.set(null);
    this.appointmentService.getAppointmentsByUser(userId).subscribe({
      next: (appointments) => {
        const now = new Date();
        this.upcoming.set(appointments.filter(appointment => new Date(appointment.appointmentDate) >= now));
        this.past.set(appointments.filter(appointment => new Date(appointment.appointmentDate) < now));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load appointments. Please try again.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  loadAppointments(userId: number) {
    this.loading.set(true);
    this.error.set(null);
    this.appointmentService.getAppointmentsByUser(userId).subscribe({
      next: (appointments) => {
        const now = new Date();
        this.upcoming.set(appointments.filter(appointment => new Date(appointment.appointmentDate) >= now));
        this.past.set(appointments.filter(appointment => new Date(appointment.appointmentDate) < now));
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to load appointments. Please try again.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  bookAppointment() {
    this.error.set(null);
    this.success.set(null);

    if (!this.serviceTypes.trim() || !this.appointmentDate.trim() || !this.notes.trim()) {
      this.error.set('Please fill in all required fields for your appointment.');
      return;
    }

    const user = this.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    const payload: Appointment = {
      userId: user.userId,
      serviceType: this.serviceTypes.trim(),
      appointmentDate: new Date(this.appointmentDate).toISOString(),
      notes: this.notes.trim(),
      status: 'Upcoming'
    };

    this.loading.set(true);
    this.appointmentService.createAppointment(payload).subscribe({
      next: () => {
        this.success.set('Appointment booked successfully.');
        this.serviceTypes = '';
        this.appointmentDate = '';
        this.notes = '';
        this.loadAppointments(user.userId);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Could not book the appointment. Please try again.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}
