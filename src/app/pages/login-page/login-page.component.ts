import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InteractionService } from '../../services/interaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  email: string = "";
  password: string = "";

  constructor(private auth: AuthService, public interaction: InteractionService) {}

  ngOnInit() {
    this.interaction.clearMessages();
  }

  async login() {
    this.interaction.clearMessages();
    if (!this.email || !this.password) {
      this.interaction.showErrorMessage("El correo y la contraseña son obligatorios.");
    } else {
      this.interaction.showSuccessMessage("Cargando...");      
      await this.auth.login(this.email, this.password).then((res) => {
        if (res && res.user) {
          this.interaction.clearMessages();
          this.interaction.navegarComponente("Inicio de sesión exitoso.", "home");
        }
      }).catch((error) => {
        this.interaction.clearMessages();
        if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
         this.interaction.showErrorMessage("Las credenciales proporcionadas son incorrectas.");
        } else if (error.code === "auth/user-disabled") {
          this.interaction.showErrorMessage("Tu cuenta está deshabilitada. Por favor, contacta al soporte para más información.");
        } else if (error.code === "auth/too-many-requests") {
          this.interaction.showErrorMessage("Demasiados intentos fallidos. Por favor, espera antes de intentarlo de nuevo.");
        } else {
          this.interaction.showErrorMessage("Error al iniciar sesión.");
        }
      });      
    }
  }

  async forgotPassword() {
    this.auth.resetPassword(this.email).then(() => {
      console.log("Correo de restablecimiento enviado");
    }).catch(error => {
      console.error("Error al enviar el correo de restablecimiento: ", error);
    });
  }

}
