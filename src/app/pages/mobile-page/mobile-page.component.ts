import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";

@Component({
  selector: 'app-mobile-page',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './mobile-page.component.html',
  styleUrl: './mobile-page.component.css'
})
export class MobilePageComponent {

}
