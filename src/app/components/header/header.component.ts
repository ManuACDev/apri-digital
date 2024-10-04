import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
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

  constructor(private auth: AuthService, private elementRef: ElementRef) { 
    this.auth.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("isAuthenticated: " + this.isAuthenticated)
    });
  }

  toggleMenu(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
  
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

  handleMenuClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (target.tagName === 'A' || target.closest('a')) {
      this.closeMenu();
    }
  }

  closeMenu() {
    const sideMenu = document.getElementById('sideMenu');
    if (sideMenu) {
      sideMenu.classList.remove('open'); // Cerrar el menú
    }

    const submenu = document.querySelector('.side-dropdown.open');
    if (submenu) {
      submenu.classList.remove('open');
      const toggleElement = submenu.querySelector('.side-dropdown-toggle');
      if (toggleElement) {
        toggleElement.textContent = "▼";
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const sideMenu = document.getElementById('sideMenu');

    if (sideMenu) {
      const isMenuOpen = sideMenu.classList.contains('open');
      const clickedInsideMenu = sideMenu.contains(event.target as Node);

      if (isMenuOpen && !clickedInsideMenu) {
        this.closeMenu();
      }
    }
  }

}
