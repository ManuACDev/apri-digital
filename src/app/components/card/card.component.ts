import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() entity!: {
    id: string; 
    type: string;
    title: string; 
    subtitle: string;
    imageSrc: string;
    images?: string[];
    videoUrl?: string;
    sections: {
      title: string;
      content: string;
      list?: string[];
    }[];
  };

}
