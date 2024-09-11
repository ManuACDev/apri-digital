import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TitleComponent, CardComponent, CommonModule],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent {

  projects = [
    {
      id: "padel-center",
      type: "proyectos",
      title: "Padel Center X4",
      subtitle: "Implementación de nuestro producto 'TrackManager' para optimizar la gestión de reservas en pistas de pádel.",
      imageSrc: "assets/projects/padel-center/1-padel-center.png",
      images: ["assets/projects/padel-center/0-login-registro.png", "assets/projects/padel-center/2-horario-pistas.png", "assets/projects/padel-center/3-pago-stripe.png", "assets/projects/padel-center/4-catalogo-productos.png", "assets/projects/padel-center/5-contacto.png", "assets/projects/padel-center/6-perfil-usuario.png", "assets/projects/padel-center/7-perfil-admin.png", "assets/projects/padel-center/8-gestion-usuario.png", "assets/projects/padel-center/9-gestion-reservas.png", "assets/projects/padel-center/10-gestion-pistas.png", "assets/projects/padel-center/11-gestion-pagos.png", "assets/projects/padel-center/12-gestion-reembolsos.png", "assets/projects/padel-center/13-gestion-productos.png"],
      videoUrl: "assets/projects/padel-center/video/padel-center.mp4",
      sections: [
        {
          title: "Descripción del Proyecto",
          content: "Padel Center X4 es una empresa que ofrece instalaciones para la práctica del pádel. Para mejorar su servicio y optimizar la gestión de sus reservas, Padel Center X4 ha integrado la solución 'TrackManager', una app móvil avanzada que permite gestionar fácilmente las reservas de pistas, la comunicación con los clientes, y la administración de sus instalaciones.",
          list: ["Solución digital para gestión de reservas de pistas de pádel", "Integración con sistemas de pago seguros y eficientes", "Optimización del servicio al cliente y la operativa diaria"]
        },
        {
          title: "Resultados y Beneficios",
          content: "La implementación de 'TrackManager' ha permitido a Padel Center X4 incrementar la eficiencia operativa y mejorar la experiencia del cliente. Con funcionalidades como la reserva en tiempo real y la gestión centralizada de usuarios, Padel Center X4 ha visto una notable mejora en la organización de su agenda y la satisfacción de sus usuarios.",
          list: ["Gestión de reservas en tiempo real", "Seguimiento y administración de usuarios", "Reducción de tiempos de administración"]
        }
      ]
    }
  ];

}
