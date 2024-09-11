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
      id: "track-manager",
      type: "productos",
      title: "TrackManager",
      subtitle: "App móvil para gestionar reservas de pistas deportivas e instalaciones recreativas. Adaptable a todo tipo de reservas.",
      imageSrc: "assets/products/track-manager/1-track-manager.png",
      images: ["assets/products/track-manager/2-inicio-menu.png", "assets/products/track-manager/3-pistas-disponibles.png", "assets/products/track-manager/4-horario-pistas.png", "assets/products/track-manager/5-pago-stripe.png", "assets/products/track-manager/6-catalogo-productos.png", "assets/products/track-manager/7-contacto-servicios.png", "assets/products/track-manager/8-perfil-admin.png", "assets/products/track-manager/9-gestion-usuarios.png", "assets/products/track-manager/10-gestion-reservas.png", "assets/products/track-manager/11-gestion-pistas.png", "assets/products/track-manager/12-gestion-recibos.png", "assets/products/track-manager/13-gestion-reembolsos.png", "assets/products/track-manager/14-gestion-productos.png", "assets/products/track-manager/15-apri-digital.png"],
      videoUrl: "assets/products/track-manager/video/track-manager.mp4",
      sections: [
        {
          title: "Descripción general",
          content: "TrackManager es una app móvil para la gestión de reservas de cualquier tipo de pistas deportivas o instalaciones recreativas. Con una interfaz intuitiva y funcionalidades avanzadas, permite a los centros deportivos gestionar fácilmente sus horarios, reservas y pagos, proporcionando una experiencia eficiente tanto para administradores como para usuarios. Compatible con múltiples tipos de instalaciones, TrackManager optimiza la operación diaria y mejora la satisfacción del cliente.",
          list: ["Reserva de pistas", "Integración con sistemas de pago", "Catálogo de productos", "Contacto, información y ubicación"]
        },
        {
          title: "CRM incorporado",
          content: "Optimiza la gestión de tu centro deportivo con herramientas avanzadas que facilitan la administración diaria, mejoran la comunicación con los clientes y aumentan la eficiencia operativa.",
          list: ["Gestión de reservas en tiempo real", "Seguimiento y administración de usuarios", "Asignación y gestión de pistas"]
        }
      ]
    }
  ];

}
