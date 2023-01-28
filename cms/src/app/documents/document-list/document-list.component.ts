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
    new Document(1,"R. Kent Jackson","jacksonk@byui.edu","208-496-3771"),
    new Document(2,"Rex Barzee","barzeer@byui.edu","208-496-3768"),
    new Document(3,"R. Kent Jackson","jacksonk@byui.edu","208-496-3771"),
    new Document(4,"R. Kent Jackson","jacksonk@byui.edu","208-496-3771"),
    new Document(5,"R. Kent Jackson","jacksonk@byui.edu","208-496-3771")
  ];

constructor(){

}


ngOnInit(){
  
}

onSelectedDocument(document: Document){
  
  this.selectedDocumentEvent.emit(document);
}

}
