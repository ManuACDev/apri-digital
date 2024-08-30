import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { SectionComponent } from "../../components/section/section.component";

@Component({
  selector: 'app-software-page',
  standalone: true,
  imports: [TitleComponent, SectionComponent],
  templateUrl: './software-page.component.html',
  styleUrl: './software-page.component.css'
})
export class SoftwarePageComponent {

}
