import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkerService } from '../services/worker.service';

@Component({
  selector: 'app-form-worker',
  templateUrl: './form-worker.component.html',
  styleUrls: ['./form-worker.component.css'],
  standalone: false
})
export class FormWorkerComponent {
  workerForm: FormGroup;

  constructor(private fb: FormBuilder, private workerService: WorkerService) {
    // Initialize the reactive form with validation
    this.workerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      dob: ['', Validators.required],
      occupation: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], 
      post: ['', Validators.required],
      city: ['', Validators.required],
      service: ['', Validators.required],
      expyear: ['', [Validators.required, Validators.min(0)]], 
      serviceDescription: ['', Validators.required],
      image: ['', Validators.required], 
    });
  }

  onSubmit() {
    if (this.workerForm.valid) {
      this.workerService.createWorker(this.workerForm.value).subscribe({
        next: (response: any) => {
          console.log('Worker added successfully:', response);
          alert('Worker added successfully!');
          this.workerForm.reset(); 
        },
        error: (error) => {
          console.error('Error adding worker:', error);
          alert('Failed to add worker. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
      this.workerForm.markAllAsTouched();
    }
  }
}
