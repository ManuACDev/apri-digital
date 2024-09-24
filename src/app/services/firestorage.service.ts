import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
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

}
