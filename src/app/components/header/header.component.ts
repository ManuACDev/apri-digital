import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isAuthenticated: boolean = false;

  constructor(private auth: AuthService) { 
    this.auth.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("isAuthenticated: " + this.isAuthenticated)
    });
  }

  toggleMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      sideMenu.classList.toggle('open');
    }
  }

  toggleSubmenu(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    const toggleElement = event.currentTarget as HTMLElement;
    const parentElement = toggleElement.closest('.side-dropdown');

    if (parentElement) {
        const isOpen = parentElement.classList.toggle('open');
        toggleElement.textContent = isOpen ? "▲" : "▼";
    }
  }

  logout() {
    this.auth.logout();
  }

}
