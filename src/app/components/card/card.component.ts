import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Media } from '../../models/media';

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
    imageSrc: Media;
    images?: Media[];
    videoUrl?: Media;
    sections: {
      title: string;
      content: string;
      list?: string[];
    }[];
  };

  @Input() isAuthenticated: boolean = false;
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  showOptions: boolean = false;

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  onMouseLeave() {
    this.showOptions = false;
  }

  onEdit() {
    this.edit.emit(this.entity);
    this.showOptions = !this.showOptions;
  }

  onDelete() {
    this.delete.emit(this.entity);
  }
}
