import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, ReactiveFormsModule],
  templateUrl: './contacto-page.component.html',
  styleUrl: './contacto-page.component.css'
})
export class ContactoPageComponent {

  contactForm: FormGroup;
  submitted = false;
  successMessage: string = "";
  errorMessage: string = "";

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Formulario enviado', this.contactForm.value);

      this.successMessage = "¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.";
      this.errorMessage = "";
    } else {
      this.errorMessage = "Por favor, completa todos los campos correctamente.";
      this.successMessage = "";
    }
  }

  get f() { return this.contactForm.controls; }
}
