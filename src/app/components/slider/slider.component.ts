import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {
  
  slides = [
    { image: "assets/consultoria-software.jpg", title: "Consultoría de Software", description: "Soluciones personalizadas para optimizar tu negocio." },
    { image: "assets/trabajo-equipo.png", title: "Trabajo en Equipo", description: "Colaboración efectiva para soluciones de software innovadoras." },
    { image: "assets/desarrollo-software-1.png", title: "Desarrollo de Software", description: "Innovación en desarrollo móvil y web a medida." }
  ];
  
  currentSlide = 0;
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

}
