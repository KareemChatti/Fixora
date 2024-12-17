import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';

@Component({
    selector: 'app-worker-details-popup',
    templateUrl: './worker-details.component.html',
    styleUrls: ['./worker-details.component.css'],
    standalone: false
})
export class WorkerDetailsComponent {
  @Input() worker: any;
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();

  closePopup(): void {
    this.close.emit();
  }

  contactWorker(phone: string): void {
    Swal.fire({
      title: 'Confirm',
      text: `Do you want to call this worker at ${phone} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Call',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `tel:${phone}`;
      }
    });
  }

  sendEmail(email: string): void {
    Swal.fire({
      title: 'Please enter your exact address',
      html: `
        <input type="text" id="userAddress" class="swal2-input" placeholder="your adress" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Send',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const userLocation = (document.getElementById('userAddress') as HTMLInputElement).value;
        if (!userLocation) {
          Swal.showValidationMessage('Please provide an address');
          return false;  
        }
        return userLocation;  
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const userLocation = result.value;
        const templateParams = {
          worker:this.worker.email,
          name:this.worker.firstname,
          subject: 'Demande de service',
          message: `Bonjour,

Je souhaiterais que vous veniez effectuer le travail demandé à l'adresse suivante : ${userLocation}.
Merci de me répondre pour convenir d'un rendez-vous.

Cordialement,`
        };
        emailjs
          .send('service_1', 'template_zw95g0i', templateParams, 'qdV3F6MVIdQNuw23-')
          .then((response) => {
            console.log('success ', response.status, response.text);
            Swal.fire('Success', 'The email has been successfully sent!', 'success');
          })
          .catch((error) => {
            console.error('Error :', error);
            Swal.fire('Error', 'The email sending failed. Please try again.', 'error');
          });
      }
    });
  }
}
