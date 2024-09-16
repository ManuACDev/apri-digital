import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  email: string = "";
  password: string = "";

  constructor(private auth: AuthService, private interaction: InteractionService) {}

  async login() {
    if (!this.email || !this.password) {
      this.interaction.presentToast("El correo y la contraseña son oblligatorios", 1500);
    } else {
      this.interaction.presentToast("Cargando...", 1500);
      this.auth.login(this.email, this.password).then((res) => {
        if (res && res.user) {
         this.interaction.navegarComponente("home");
        } else {
          this.interaction.presentToast("Error al iniciar sesión: ", 1500);
        }
      }).catch(error => {
        if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
          this.interaction.presentToast("Las credenciales proporcionadas son incorrectas", 1500);
        } else if (error.code === "auth/user-disabled") {
          this.interaction.presentToast("Tu cuenta está deshabilitada. Por favor, contacta al soporte para más información.", 1500);
        } else if (error.code === "auth/too-many-requests") {
          this.interaction.presentToast("Demasiados intentos fallidos. Por favor, espera antes de intentarlo de nuevo.", 1500);
        } else {
          this.interaction.presentToast("Error al iniciar sesión.", 1500); 
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
