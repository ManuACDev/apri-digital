import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { SectionComponent } from "../../components/section/section.component";

@Component({
  selector: 'app-web-page',
  standalone: true,
  imports: [TitleComponent, SectionComponent],
  templateUrl: './web-page.component.html',
  styleUrl: './web-page.component.css'
})
export class WebPageComponent {

}
