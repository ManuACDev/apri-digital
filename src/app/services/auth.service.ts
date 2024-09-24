import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState, User, sendPasswordResetEmail } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login(email: string, password: string): Promise<User | null> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => userCredential.user)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  async resetPassword(correo: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, correo);
      console.log("Correo de restablecimiento de contraseña enviado.");
    } catch (error) {
      console.error("Error al enviar el correo de restablecimiento de contraseña:", error);
    }
  }

  getAuthState(): Observable<User | null> {
    return authState(this.auth);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

}
