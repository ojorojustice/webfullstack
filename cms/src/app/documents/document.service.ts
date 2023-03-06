import { Document } from './document.model';
import { Subject } from 'rxjs';
import {EventEmitter, Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document>();
  documents: Document[] = [];
  maxDocumentId: number;
  

  constructor(private http:HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(){
    // return this.documents.slice()
    this.http.get("https://contactdocumentmessage-default-rtdb.firebaseio.com/documents.json").subscribe(
      // success method
      (documents: Document[]|any ) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        // sort the list of documents
        this.documents.sort((a: any, b:any) => a.id - b.id);
        // emit the next document list change event
        this.documentListChangedEvent.next(this.documents.slice());
      },
      // error method
      (error: any) => {
        console.error(error);
      } 
    );
  }

  
  getDocument(id:string){
    return this.documents[+id] || null;
  }



//   deleteDocument(document: Document) {
//    const index = this.documents.findIndex(doc => doc.id === document.id);
//    if (index === -1) {
//       return;
//    }
//    this.documents.splice(index, 1);
//    this.documents.slice()
//    for (const doc of this.documents) {
//       this.documentChangedEvent.emit(doc);
//    }
// }


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
    // const documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);  
    this.storeDocuments()
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (originalDocument == null || newDocument == null) {
    return;
  }

  const pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  // const documentsListClone = this.documents.slice();
  // this.documentListChangedEvent.next(documentsListClone);
  this.storeDocuments()
}

deleteDocument(document:Document) {
  if (document == null) {
    return;
  }

  const pos = this.documents.indexOf(document);
  if (pos < 0) {
    return;
  }

  this.documents.splice(pos, 1);
  // const documentsListClone = this.documents.slice();
  // this.documentListChangedEvent.next(documentsListClone);
  this.storeDocuments();
}


storeDocuments() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const jsonDocuments = JSON.stringify(this.documents);
  this.http.put('https://contactdocumentmessage-default-rtdb.firebaseio.com/documents.json', jsonDocuments, { headers }).subscribe(() => {
    const documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
  });
}
}
