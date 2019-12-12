import { Injectable } from '@angular/core';
import { FirestoreObjectService } from '../../general/firestore-object.service';
import * as Model from '../model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends FirestoreObjectService<Model.Product> {
  constructor(firestore: AngularFirestore) {
    super(Model.Product, firestore, 'product')
  }
}