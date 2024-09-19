import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadMedia(file: any, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `${path}/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = fileRef.put(file);

      task.snapshotChanges().pipe(finalize(() => {
        fileRef.getDownloadURL().subscribe({
          next: (url) => resolve(url),
          error: (err) => reject(err)
        });
      })).subscribe({error: (err) => 
        reject(err)
      });
    });
  }

}
