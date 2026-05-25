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
   dentalServices = [
    { name: 'Dental & Oral X-ray', icon: '🩻' },
    { name: 'Ultrasonic Teeth Cleaning', icon: '🦷' },
    { name: 'Oral Cleaning', icon: '✨' },
    { name: 'Braces Removal', icon: '😬' },
    { name: 'School Dental Camps', icon: '🏫' },
    { name: 'Advanced Preventive Dental Care', icon: '🛡️' },
    { name: 'Regular Clean Up', icon: '🪥' },
    { name: 'Alignment', icon: '📏' },
    { name: 'Complete Dental Care', icon: '🏥' },
    { name: 'Gum Care', icon: '🩸' },
    { name: 'Routine Checkup', icon: '📅' }
  ];

  dentalSurgery = [
    { name: 'Scraping Periodontal', icon: '🩺' },
    { name: 'Oral And Maxillofacial', icon: '🦷' },
    { name: 'Periodontal Flap', icon: '🔪' }
  ];
  dentalTreatment =[
    { name: 'Bleeding Gums', icon: '🩸' },
    { name: 'RCT (Root Canal)', icon: '🦷' }
  ];
  dentalProcedures = [
    { name: 'Fixed Prosthodontics', icon: '🦷' }
  ];

  constructor() {}

  ngOnInit() {
  }
}
