import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { SectionComponent } from "../../components/section/section.component";

@Component({
  selector: 'app-consultoria-page',
  standalone: true,
  imports: [TitleComponent, SectionComponent],
  templateUrl: './consultoria-page.component.html',
  styleUrl: './consultoria-page.component.css'
})
export class ConsultoriaPageComponent {

}
