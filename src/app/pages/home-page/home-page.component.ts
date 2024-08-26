import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { ServicesComponent } from "../../components/services/services.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, SliderComponent, ServicesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
