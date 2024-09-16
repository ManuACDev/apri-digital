import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

  async login(correo: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(correo, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(correo: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(correo);
    } catch (error) {
      console.log(error);
    }
  }

}
