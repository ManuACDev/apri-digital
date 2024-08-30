import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

  @Input() imageSrc: string = "";
  @Input() mainTitle: string = "";

  // Definimos una estructura para secciones con título, contenido y listas opcionales
  @Input() sections: { 
    title: string; 
    content: string; 
    list?: string[]; 
  }[] = [];

}
