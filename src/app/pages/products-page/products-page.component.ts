import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {

}
