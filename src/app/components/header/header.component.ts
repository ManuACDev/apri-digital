import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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

}