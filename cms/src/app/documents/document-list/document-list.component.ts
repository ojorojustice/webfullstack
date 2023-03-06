import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{
    documents!: Document[] | any;
    private subscription!: Subscription

constructor(private documentService: DocumentService){

}

ngOnInit(){
  this.documents = this.documentService.getDocuments();
  this.subscription = this.documentService.documentListChangedEvent.subscribe((documentList:Document[])=>{      
    this.documents= documentList      
  })
  this.documentService.documentChangedEvent.subscribe(
    (document:Document[])=>{      
      this.documents= document      
    }
   )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  

// onSelectedDocument(document: Document){  
//   this.documentService.documentSelectedEvent.emit(document);
// }

}
