import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private router: Router) { }

  presentToast(mensaje: string, duration: number) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = mensaje;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 1000);
    }, duration);
  }

  navegarComponente(componente: string) {
    this.presentToast("Cargando...", 500);
    setTimeout(() => {
      this.router.navigate(['/', componente]);
    }, 500);
  }
}
