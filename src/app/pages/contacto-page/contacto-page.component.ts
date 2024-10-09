import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InteractionService } from '../../services/interaction.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contacto-page',
  standalone: true,
  imports: [CommonModule, TitleComponent, ReactiveFormsModule],
  templateUrl: './contacto-page.component.html',
  styleUrl: './contacto-page.component.css'
})
export class ContactoPageComponent implements OnInit {

  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, public interaction: InteractionService, private contact: ContactService) {
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
      this.interaction.showSuccessMessage("Formulario enviado correctamente.");      
      this.contact.sendContactForm(this.contactForm.value).then(() => {
        this.interaction.showSuccessMessage("¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.");
        setTimeout(() => {
          this.contactForm.reset();
          this.submitted = false;
          this.interaction.clearMessages();
        }, 5000);
      }).catch((error) => {
        console.error("Error al enviar el formulario de contacto:", error);
        this.interaction.showErrorMessage("Error al enviar el mensaje");
        this.submitted = false;
      });
    } else {
      this.interaction.showErrorMessage("Por favor, completa todos los campos correctamente.");
      this.submitted = false;
    }
  }  

  get f() { return this.contactForm.controls; }
}
