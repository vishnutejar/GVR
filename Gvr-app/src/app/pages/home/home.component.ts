import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService, Doctor } from '../../services/doctor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  doctors = signal<Doctor[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  showForm = signal(false);
  editingDoctorId = signal<number | null>(null);

  formData = signal<Doctor>({
    experienceYears: 0
  });

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.loading.set(true);
    this.error.set(null);
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load doctors. Please ensure the API is running.');
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  openCreateForm() {
    this.editingDoctorId.set(null);
    this.formData.set({ experienceYears: 0 });
    this.showForm.set(true);
  }

  openEditForm(doctor: Doctor) {
    this.editingDoctorId.set(doctor.doctorId || null);
    this.formData.set({ ...doctor });
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.formData.set({ experienceYears: 0 });
    this.editingDoctorId.set(null);
  }

  saveDoctor() {
    const currentForm = this.formData();
    
    if (!currentForm.fullName || !currentForm.specialization) {
      this.error.set('Please fill in all required fields');
      return;
    }

    const isEditing = this.editingDoctorId() !== null;
    const operation = isEditing
      ? this.doctorService.updateDoctor(this.editingDoctorId()!, currentForm)
      : this.doctorService.createDoctor(currentForm);

    operation.subscribe({
      next: () => {
        this.closeForm();
        this.loadDoctors();
        this.error.set(null);
      },
      error: (err) => {
        this.error.set(isEditing ? 'Failed to update doctor' : 'Failed to create doctor');
        console.error(err);
      }
    });
  }

  deleteDoctor(id: number | undefined) {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe({
        next: () => {
          this.loadDoctors();
          this.error.set(null);
        },
        error: (err) => {
          this.error.set('Failed to delete doctor');
          console.error(err);
        }
      });
    }
  }

  updateFormField(field: keyof Doctor, value: any) {
    const current = this.formData();
    this.formData.set({ ...current, [field]: value });
  }
}
