import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { from, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private functions: Functions) { }

  async sendContactForm(contactData: { name: string, email: string, message: string }) {
    try {
      const sendContactEmail = httpsCallable(this.functions, 'sendContactEmail');
      const response = await lastValueFrom(from(sendContactEmail(contactData)));
      return response;
    } catch (error) {
      console.error('Error al enviar el formulario de contacto:', error);
      throw error;
    }
  }
}
