import { Component, OnInit, Input } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{
  @Input() selectedDocument!: Document;
 

 constructor(private documentService: DocumentService){}

 ngOnInit(){
  this.documentService.documentSelectedEvent.subscribe(
    (document:Document)=>{      
      this.selectedDocument= document      
    }
   )
 }

 selectView(selectedDocument: Document){
  this.selectedDocument = selectedDocument;
}



}
