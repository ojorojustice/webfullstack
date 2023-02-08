import { Document } from './document.model';
import {EventEmitter, Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(){
    console.log(this.documents)
    return this.documents.slice()
  }
  getDocument(id:string){
    return this.documents.find(document => document.id === id) || null;
  }
}
