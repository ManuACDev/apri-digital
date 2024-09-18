import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { lastValueFrom } from 'rxjs';
import { Entity } from '../../models/entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [TitleComponent, CardComponent, CommonModule],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {

  products: Entity[] = [];
  isAuthenticated: boolean = false;
  mostrarFormulario: boolean = false;

  constructor(private firestoreService: FirestoreService, private auth: AuthService) {
    this.auth.user$.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("isAuthenticated: " + this.isAuthenticated)
    });

  }

  ngOnInit() {
    this.getProductos();
  }

  async getProductos(): Promise<void> {
    try {
      
      const productos = await lastValueFrom(this.firestoreService.getCollection<Entity>("Productos"));
      //this.proyectos = proyectos.sort((a, b) => b.id - a.id);
      this.products = productos;

    } catch (error) {
      console.error("Error al obtener los productos: ", error);
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

}
