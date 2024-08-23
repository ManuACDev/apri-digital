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
    { image: "assets/consultoria-software.jpg", title: 'TITULO PRINCIPAL 1', description: 'Esto es una gran descripción 1' },
    { image: "assets/servicios-desarrollo-software.jpg", title: 'TITULO PRINCIPAL 2', description: 'Esto es una gran descripción 2' },
    { image: "assets/boreas-rutas.jpg", title: 'TITULO PRINCIPAL 3', description: 'Esto es una gran descripción 3' }
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
