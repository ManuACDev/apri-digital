import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: Storage) { }

  uploadMedia(file: any, path: string): Observable<string> {
    const filePath = `${path}/${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable<string>((observer) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Subida en progreso: ${progress}%`);
        },
        (error) => {
          console.error("Error al subir el archivo:", error);
          observer.error("Error al subir el archivo. Por favor, intenta de nuevo.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            observer.next(downloadURL);
            observer.complete();
          }).catch((error) => {
            console.error("Error al obtener la URL de descarga:", error);
            observer.error("Error al obtener la URL de descarga.");
          });
        }
      );
    });
  }

  deleteMediaFolder(folderPath: string) {
    const storageRef = ref(this.storage, folderPath);
  
    listAll(storageRef).then((result) => {
      const deletePromises = result.items.map((itemRef) => {  
        return deleteObject(itemRef);
      });
        
      const subFolderPromises = result.prefixes.map((folderRef) => {
        return this.deleteMediaFolder(folderRef.fullPath);
      });
  
      return Promise.all([...deletePromises, ...subFolderPromises]);
    }).then(() => {
      console.log('Carpeta eliminada con éxito:', folderPath);
    }).catch((error) => {
      console.error('Error al eliminar la carpeta:', error);
    });
  }  
}
