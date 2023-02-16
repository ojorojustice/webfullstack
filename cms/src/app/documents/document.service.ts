import { Document } from './document.model';
import {EventEmitter, Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(){
    console.log(this.documents)
    return this.documents.slice()
  }

  
  getDocument(id:string){
    return this.documents[+id] || null;
  }

  deleteDocument(document: Document) {
   const index = this.documents.findIndex(doc => doc.id === document.id);
   if (index === -1) {
      return;
   }
   this.documents.splice(index, 1);
   this.documents.slice()
   for (const doc of this.documents) {
      this.documentChangedEvent.emit(doc);
   }
}
}
