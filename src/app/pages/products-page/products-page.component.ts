import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../services/firestore.service';
import { lastValueFrom } from 'rxjs';
import { Entity } from '../../models/entity';
import { AuthService } from '../../services/auth.service';
import { FormComponent } from "../../components/form/form.component";
import { FirestorageService } from '../../services/firestorage.service';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [TitleComponent, CardComponent, CommonModule, FormComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {

  products: Entity[] = [];
  isAuthenticated: boolean = false;
  showForm: boolean = false;
  entity!: Entity;
  loading: boolean = false;

  constructor(private firestoreService: FirestoreService, private auth: AuthService, private firestorage: FirestorageService, public interaction: InteractionService) {
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

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmitProduct(entity: Entity) {
    this.loading = true;
    const productTitle  = entity.title;
    const imagePath = `Productos/${productTitle}`;

    this.firestorage.uploadMedia(entity.imageSrc, imagePath).then(imageSrc => {
      entity.imageSrc = imageSrc;

      if (entity.videoUrl) {
        const videoPath = `Productos/${productTitle}/video`;
        return this.firestorage.uploadMedia(entity.videoUrl, videoPath).then(videoUrl => {
          entity.videoUrl = videoUrl;
          return Promise.resolve();
        });
      }
      return Promise.resolve();
    }).then(() => {
      if (entity.images.length > 0) {
        const imageUploadPromises = entity.images.map((image) => {
          const additionalImagePath = `Productos/${productTitle}/images`;
          return this.firestorage.uploadMedia(image, additionalImagePath);
        });

        return Promise.all(imageUploadPromises).then(urls => {
          entity.images = urls;
        });
      }
      return Promise.resolve();
    }).then(() => {
      this.firestoreService.createColl(entity, "Productos").then(doc => {
        console.log("Producto guardado con éxito: ", doc.id);
        this.interaction.showSuccessMessage("Producto guardado con éxito.");
        //return this.firestoreService.updateDoc("Productos", doc.id, { id: doc.id });
      });
    }).catch(error => {
      console.error("Error al guardar el producto: ", error);
      this.interaction.showErrorMessage("Error al guardar el producto.");
    }).finally(() => {
      setTimeout(() => {
        this.showForm = false;
        this.getProductos();
      }, 1000);
    });
  }

}
