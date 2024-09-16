import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.auth.login(this.email, this.password).then((res) => {
      if (res) {
       this.router.navigate(['home']);
      } else {
        console.log("Res: " + res);
      }
    }).catch(error => {
       console.error("Error en inicio de sesión: ", error);
    });
  }

  async forgotPassword() {
    this.auth.resetPassword(this.email).then(() => {
      console.log("Correo de restablecimiento enviado");
    }).catch(error => {
      console.error("Error al enviar el correo de restablecimiento: ", error);
    });
  }

}
