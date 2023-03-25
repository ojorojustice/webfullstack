import { Document } from './document.model';
import { Subject } from 'rxjs';
import {EventEmitter, Injectable } from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders} from '@angular/common/http';



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
    // this.documents = MOCKDOCUMENTS;
    this.documents = [];
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(){
    // return this.documents.slice() https://contactdocumentmessage-default-rtdb.firebaseio.com/documents.jsonhttp://localhost:3000/documents
    this.http.get("http://localhost:3000/documents").subscribe(
      // success method
      (documentsObject: Document[]|any ) => {
        this.documents = documentsObject.documents;
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



addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';
   

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      );
  }

// addDocument(newDocument: Document | null ) {
//   if (newDocument == null || newDocument == undefined) {
//     return;
//   }
//   this.maxDocumentId++;
//     newDocument.id = String(this.maxDocumentId);
//     this.documents.push(newDocument);
//     // const documentsListClone = this.documents.slice();
//     // this.documentListChangedEvent.next(documentsListClone);  
//     this.storeDocuments()
// }


updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
  // newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      () => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
        
      }
    );
}

// updateDocument(originalDocument: Document, newDocument: Document) {
//   if (originalDocument == null || newDocument == null) {
//     return;
//   }

//   const pos = this.documents.indexOf(originalDocument);
//   if (pos < 0) {
//     return;
//   }

//   newDocument.id = originalDocument.id;
//   this.documents[pos] = newDocument;
//   // const documentsListClone = this.documents.slice();
//   // this.documentListChangedEvent.next(documentsListClone);
//   this.storeDocuments()
// }



sortAndSend(){
  this.documents.sort((a,b)=>{
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  this.documentListChangedEvent.next(this.documents.slice())
}


deleteDocument(document: Document) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      () => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      }
    );
}


storeDocuments() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const jsonDocuments = JSON.stringify(this.documents);
  this.http.put('http://localhost:3000/documents/ ', jsonDocuments, { headers }).subscribe(() => {
    const documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);
  });
}
}
