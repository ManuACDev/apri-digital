import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, ReactiveFormsModule],
  templateUrl: './contacto-page.component.html',
  styleUrl: './contacto-page.component.css'
})
export class ContactoPageComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, public interaction: InteractionService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.interaction.clearMessages();
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Formulario enviado', this.contactForm.value);
    
      this.interaction.showSuccessMessage("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
    } else {
      this.interaction.showErrorMessage("Por favor, completa todos los campos correctamente.");
    }
  }

  get f() { return this.contactForm.controls; }
}
