import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { SectionComponent } from "../../components/section/section.component";

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [TitleComponent, SectionComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {

}
