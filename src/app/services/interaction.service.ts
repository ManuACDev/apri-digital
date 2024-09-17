import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  successMessage: string = "";
  errorMessage: string = "";

  constructor(private router: Router) { }

  showSuccessMessage(message: string) {
    this.successMessage = message;
    this.errorMessage = "";
  }

  showErrorMessage(message: string) {
    this.errorMessage = message;
    this.successMessage = "";
  }

  navegarComponente(message: string, componente: string) {
    this.clearMessages();
    this.showSuccessMessage(message);
    setTimeout(() => {
      this.router.navigate(['/', componente]);
    }, 500);
  }

  clearMessages() {
    this.successMessage = "";
    this.errorMessage = "";
  }
}
