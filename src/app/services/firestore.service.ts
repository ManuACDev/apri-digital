import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs } from '@angular/fire/firestore';
import { catchError, from, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  // Método para obtener todos los documentos de una colección
  getCollection<T>(collectionPath: string): Observable<T[]> {
    const collectionRef = collection(this.firestore, collectionPath);
    return from(getDocs(collectionRef)).pipe(
      take(1),
      map(querySnapshot => 
        querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as T))
      ),
      catchError(error => {
        console.error("Error al obtener la colección: ", error);
        throw error;
      })
    );
  }

  createColl(data: any, path: string): Promise<any> {
    const collectionRef = collection(this.firestore, path);
    return addDoc(collectionRef, data).then(docRef => {
      console.log("Documento añadido con ID: ", docRef.id);
      return docRef;
    }).catch(error => {
      console.error("Error al añadir documento: ", error);
      throw error;
    });
  }

}
