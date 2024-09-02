import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() product!: {
    id: string; 
    title: string; 
    description: string; 
    imageSrc: string;
  };

  @Output() productClicked = new EventEmitter<any>();

  handleClick() {
    this.productClicked.emit(this.product);
  }

}
