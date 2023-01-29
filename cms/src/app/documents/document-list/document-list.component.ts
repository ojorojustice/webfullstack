import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[]=[
    new Document(1,"R. Kent Jackson","Birth Certificate and related materials","www.example1.com"),
    new Document(2,"Rex Barzee","School certificate and other related materials","www.example2.com"),
    new Document(3,"R. Kent Jackson","Marriage materials and other related materials","wwww.example3.com"),
    new Document(4,"R. Michael Jackson Jackson","Letters of reccommendation","www.example4.com"),
    new Document(5,"R. Boss Jackson","Other materials that can not be descripbed","www.example5.com")
  ];

constructor(){

}

ngOnInit(){
  
}

onSelectedDocument(document: Document){
  
  this.selectedDocumentEvent.emit(document);
}

}
