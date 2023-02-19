import { Document } from './document.model';
import { Subject } from 'rxjs';
import {EventEmitter, Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  maxDocumentId: number;
  

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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


getMaxId(): number {

  let maxId = 0

  for (let i = 0; i < this.documents.length; i++) {
    const currentId = parseInt(this.documents[i].id);    
    if (currentId > maxId) {
      maxId = currentId;
    }
  }

  return maxId
}

addDocument(newDocument: Document | null ) {
  if (newDocument == null || newDocument == undefined) {
    return;
  }
  this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);  
}
}
