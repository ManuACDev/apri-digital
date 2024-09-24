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
    this.auth.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
      console.log("isAuthenticated: " + this.isAuthenticated)
    });
  }

  ngOnInit() {
    this.getProductos();
    this.interaction.clearMessages();
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
    const productTitle = entity.title;
    const imagePath = `Productos/${productTitle}`;
  
    this.firestorage.uploadMedia(entity.imageSrc, imagePath).subscribe({
      next: (imageSrc) => {
        entity.imageSrc = imageSrc;
  
        if (entity.videoUrl) {
          const videoPath = `Productos/${productTitle}/video`;
          this.firestorage.uploadMedia(entity.videoUrl, videoPath).subscribe({
            next: (videoUrl) => {
              entity.videoUrl = videoUrl;
              this.uploadAdditionalImages(entity, productTitle);
            },
            error: (error) => {
              this.handleError(error, "Error al subir el video.");
            }
          });
        } else {
          this.uploadAdditionalImages(entity, productTitle);
        }
      },
      error: (error) => {
        this.handleError(error, "Error al subir la imagen principal.");
      }
    });
  }
  
  uploadAdditionalImages(entity: Entity, productTitle: string) {
    if (entity.images.length > 0) {
      const imageUploadObservables = entity.images.map((image) => {
        const additionalImagePath = `Productos/${productTitle}/images`;
        return this.firestorage.uploadMedia(image, additionalImagePath);
      });
  
      Promise.all(imageUploadObservables.map(obs => obs.toPromise()))
        .then((urls) => {
          entity.images = urls.filter((url): url is string => !!url);
          this.saveProductToFirestore(entity);
        })
        .catch((error) => {
          this.handleError(error, "Error al subir las imágenes adicionales.");
        });
    } else {
      this.saveProductToFirestore(entity);
    }
  }
  
  saveProductToFirestore(entity: Entity) {
    this.firestoreService.createColl(entity, "Productos").then(doc => {
      console.log("Producto guardado con éxito: ", doc.id);
      this.interaction.showSuccessMessage("Producto guardado con éxito.");
      this.resetForm();
    }).catch(error => {
      this.handleError(error, "Error al guardar el producto en Firestore.");
    }).finally(() => {
      this.loading = false;
    });
  }
  
  handleError(error: any, message: string) {
    console.error(message, error);
    this.interaction.showErrorMessage(message);
    this.loading = false;
  }
  
  resetForm() {
    setTimeout(() => {
      this.showForm = false;
      this.getProductos();
    }, 1000);
  }
}
