import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

  @Input() imageSrc: string = "";
  @Input() mainTitle: string = "";
  @Input() subTitle: string = "";
  @Input() paragraph1: string = "";
  @Input() paragraph2: string = "";

}
