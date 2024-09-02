import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [TitleComponent, CardComponent, CommonModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {

  products = [
    {
      title: "TrackManager",
      description: "App móvil para gestionar reservas de pistas deportivas e instalaciones recreativas. Adaptable a todo tipo de reservas.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product1"
    },
    {
      title: "TrackManager",
      description: "App móvil para gestionar reservas de pistas deportivas e instalaciones recreativas. Adaptable a todo tipo de reservas.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product1"
    },
    {
      title: "TrackManager",
      description: "App móvil para gestionar reservas de pistas deportivas e instalaciones recreativas. Adaptable a todo tipo de reservas.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product1"
    },
    {
      title: "TrackManager",
      description: "App móvil para gestionar reservas de pistas deportivas e instalaciones recreativas. Adaptable a todo tipo de reservas.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product1"
    }
  ];

}
