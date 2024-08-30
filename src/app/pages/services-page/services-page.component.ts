import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { ServicesComponent } from "../../components/services/services.component";

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [TitleComponent, ServicesComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {

}
