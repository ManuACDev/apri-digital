import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { Entity } from '../../models/entity';
import { FirestoreService } from '../../services/firestore.service';
import { lastValueFrom, map } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormComponent } from "../../components/form/form.component";
import { InteractionService } from '../../services/interaction.service';
import { FirestorageService } from '../../services/firestorage.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TitleComponent, CardComponent, CommonModule, FormComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent implements OnInit {

  projects: Entity[] = [];
  isAuthenticated: boolean = false;
  showForm: boolean = false;
  entity: Entity | null = null;
  loading: boolean = false;
  editing: boolean = false;

  constructor(private firestoreService: FirestoreService, private auth: AuthService, public interaction: InteractionService, private firestorage: FirestorageService) {
    this.auth.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit() {
    this.getProyectos();
  }

  async getProyectos(): Promise<void> {
    try {
      
      const proyectos = await lastValueFrom(this.firestoreService.getCollection<Entity>("Proyectos"));
      //this.proyectos = proyectos.sort((a, b) => b.id - a.id);
      this.projects = proyectos;

    } catch (error) {
      console.error("Error al obtener los proyectos: ", error);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.interaction.clearMessages();
    this.editing = false;
    this.entity = null;
  }

  onSubmitProject(entity: Entity) {
    this.loading = true;
    const projectId = this.editing ? this.entity?.id || "" : entity.title;
    const imagePath = `Proyectos/${projectId}`;

    if (this.entity?.imageSrc?.name !== entity.imageSrc?.name) {

      if (this.editing) {
        const oldImagePath = `Proyectos/${this.entity?.id}/${this.entity?.imageSrc.name}`;

        this.firestorage.deleteFileFromStorage(oldImagePath).then(() => {

          this.firestorage.uploadMedia(entity.imageSrc, imagePath).subscribe({
            next: (imageSrcUrl) => {
              entity.imageSrc = { 
                name: entity.imageSrc.name,
                url: imageSrcUrl
              };
              this.uploadVideo(entity, projectId);
            }, error: (error) => {
              this.handleError(error, "Error al subir la imagen principal.");
            }
          });
        }).catch(error => {
          this.handleError(error, "Error al eliminar la imagen anterior.");
        });
      } else {
        this.firestorage.uploadMedia(entity.imageSrc, imagePath).subscribe({
          next: (imageSrcUrl) => {
            entity.imageSrc = { 
              name: entity.imageSrc.name,
              url: imageSrcUrl
            };
            this.uploadVideo(entity, projectId);
          }, error: (error) => {
            this.handleError(error, "Error al subir la imagen principal.");
          }
        });
      }
    } else {
      entity.imageSrc = this.entity.imageSrc;
      this.uploadVideo(entity, projectId);
    }
  }

  uploadVideo(entity: Entity, projectId: string) {
    const videoPath = `Proyectos/${projectId}/video`;

    if (this.entity?.videoUrl?.name !== entity.videoUrl?.name) {

      if (this.editing) {
        const oldVideoPath = `Proyectos/${this.entity?.id}/video/${this.entity?.videoUrl?.name}`;

        this.firestorage.deleteFileFromStorage(oldVideoPath).then(() => {

          this.firestorage.uploadMedia(entity.videoUrl, videoPath).subscribe({
            next: (videoUrl) => {
              entity.videoUrl = { 
                name: entity.videoUrl?.name || '',
                url: videoUrl
              };
              this.uploadAdditionalImages(entity, projectId);
            }, error: (error) => {
              this.handleError(error, "Error al subir el video.");
            }
          });
        }).catch(error => {
          this.handleError(error, "Error al eliminar el vídeo anterior.");
        });
      } else {
        this.firestorage.uploadMedia(entity.videoUrl, videoPath).subscribe({
          next: (videoUrl) => {
            entity.videoUrl = { 
              name: entity.videoUrl?.name || '',
              url: videoUrl
            };
            this.uploadAdditionalImages(entity, projectId);
          }, error: (error) => {
            this.handleError(error, "Error al subir el video.");
          }
        });
      }
    } else {
      entity.videoUrl = this.entity?.videoUrl;
      this.uploadAdditionalImages(entity, projectId);
    }
  }

  uploadAdditionalImages(entity: Entity, projectId: string) {
    if (this.entity?.images !== entity.images && entity.images.length > 0) {

      if (this.editing) {
        const oldImagePaths = this.entity?.images?.map(image => `Proyectos/${this.entity?.id}/images/${image.name}`) || [];
        const deletePromises = oldImagePaths.map(path => this.firestorage.deleteFileFromStorage(path));

        Promise.all(deletePromises).then(() => {
          const imageUploadObservables = entity.images.map((image) => {
            const additionalImagePath = `Proyectos/${projectId}/images`;
            return this.firestorage.uploadMedia(image, additionalImagePath).pipe(
              map(url => ({
                name: image.name,
                url: url
              }))
            );
          });
          
          Promise.all(imageUploadObservables.map(obs => obs.toPromise())).then((uploadedImages) => {          
            entity.images = uploadedImages.map((uploadedImage, index) => ({
              ...entity.images[index],
              name: uploadedImage?.name || entity.images[index].name,
              url: uploadedImage?.url || entity.images[index].url
            }));
    
            this.saveProjectToFirestore(entity);
          }).catch((error) => {
            this.handleError(error, "Error al subir las imágenes adicionales.");
          });
          
        }).catch(error => {
          this.handleError(error, "Error al eliminar las imágenes anteriores.");
        });
      } else {
        const imageUploadObservables = entity.images.map((image) => {
          const additionalImagePath = `Proyectos/${projectId}/images`;
          return this.firestorage.uploadMedia(image, additionalImagePath).pipe(
            map(url => ({
              name: image.name,
              url: url
            }))
          );
        });
    
        Promise.all(imageUploadObservables.map(obs => obs.toPromise())).then((uploadedImages) => {
          entity.images = uploadedImages.map((uploadedImage, index) => ({
            ...entity.images[index],
            name: uploadedImage?.name || entity.images[index].name,
            url: uploadedImage?.url || entity.images[index].url
          }));
          this.saveProjectToFirestore(entity);
        }).catch((error) => {
          this.handleError(error, "Error al subir las imágenes adicionales.");
        });
      }
    } else {
      this.saveProjectToFirestore(entity);
    }
  }

  saveProjectToFirestore(entity: Entity) {
    entity.type = "proyectos";

    if (this.editing) {
      entity.id = this.entity?.id || entity.title;
      this.firestoreService.updateDoc(entity, "Proyectos", entity.id).then(() => {
        console.log("Proyecto actualizado con éxito");
        this.interaction.showSuccessMessage("Proyecto actualizado con éxito.");
        this.resetForm();
      }).catch(error => {
        this.handleError(error, "Error al actualizar el proyecto en Firestore.");
      }).finally(() => {
        this.loading = false;
        this.getProyectos();
      });
    } else {
      entity.id = entity.title;
      this.firestoreService.setDoc(entity, "Proyectos", entity.id).then(() => {
        console.log("Proyecto guardado con éxito");
        this.interaction.showSuccessMessage("Proyecto guardado con éxito.");
        this.resetForm();
      }).catch(error => {
        this.handleError(error, "Error al guardar el proyecto en Firestore.");
      }).finally(() => {
        this.loading = false;
        this.getProyectos();
      });
    }
  }

  handleError(error: any, message: string) {
    console.error(message, error);
    this.interaction.showErrorMessage(message);
    this.loading = false;
  }
  
  resetForm() {
    setTimeout(() => {
      this.showForm = false;
      this.getProyectos();
    }, 1000);
  }

  editDoc(entity: Entity) {
    this.interaction.clearMessages();
    this.editing = true;
    this.showForm = true;
    
    this.entity = { 
      ...entity,
      sections: [...entity.sections],
      imageSrc: entity.imageSrc ? { ...entity.imageSrc } : { name: '', url: '' },
      videoUrl: entity.videoUrl ? { ...entity.videoUrl } : { name: '', url: '' }
    };
  }

  deleteDoc(entity: Entity) {
    this.firestoreService.deleteDoc("Proyectos", entity.id).then(() => {
      //this.interaction.showSuccessMessage("Proyecto eliminado con éxito.");
      console.log("Proyecto eliminado con éxito.");
      this.getProyectos();
      const mediaFolderPath = `Proyectos/${entity.id}`;
      this.firestorage.deleteMediaFolder(mediaFolderPath);
    }).catch(error => {
      this.handleError(error, "Error al eliminar el proyecto.");
    });
  }
}
