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
      title: "Producto 1",
      description: "Descripción breve del producto 1.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product1"  // Enlace a la página del producto específico
    },
    {
      title: "Producto 2",
      description: "Descripción breve del producto 2.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product2"  // Enlace a la página del producto específico
    },
    {
      title: "Producto 3",
      description: "Descripción breve del producto 3.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product3"  // Enlace a la página del producto específico
    },
    {
      title: "Producto 4",
      description: "Descripción breve del producto 4.",
      imageSrc: "assets/products/padel-group.jpg",
      link: "/products/product4"  // Enlace a la página del producto específico
    }
  ];

}
