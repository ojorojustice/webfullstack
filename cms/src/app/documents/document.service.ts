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
    console.log('I am here')
    this.documents.forEach((document)=>{
    if(document.id === id){
      return document
    }else return false})
    return null
  }
}
