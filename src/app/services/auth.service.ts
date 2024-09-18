import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = this.afAuth.authState;
  }

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
