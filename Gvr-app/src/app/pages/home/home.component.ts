import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    { name: 'Laser Dentistry', icon: 'images/treatment/treatment-icon-1.svg' },
    { name: 'Dental Fillings', icon: 'images/treatment/treatment-icon-2.svg' },
    { name: 'Invisible Aligners', icon: 'images/treatment/treatment-icon-3.svg' },
    { name: 'Braces & Aligners', icon: 'images/treatment/treatment-icon-4.svg' },
    { name: 'Invisalign Aligners', icon: 'images/treatment/treatment-icon-3.svg' },
    { name: 'Wisdom Teeth Removal', icon: 'images/treatment/treatment-icon-6.svg' },
    { name: 'Dental Implants', icon: 'images/treatment/treatment-icon-7.svg' },
    { name: 'Dental Crowns', icon: 'images/treatment/treatment-icon-8.svg' },
    { name: 'Advanced Gum Treatments', icon: 'images/treatment/treatment-icon-9.svg' },
    { name: 'Paediatric Dentistry', icon: 'images/treatment/treatment-icon-10.svg' },
    { name: 'Root Canal Treatment', icon: 'images/treatment/treatment-icon-11.svg' }
  ];
  dentalProcedures = [
    { name: 'Fixed Prosthodontics', icon: '🦷' }
  ];

  constructor() {}

  ngOnInit() {
  }
}
