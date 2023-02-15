import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {Document} from '../document.model'
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit{
  document!:Document | null;
  id!: string;

    constructor(private documentService:DocumentService,private route:ActivatedRoute){

    }
      ngOnInit(){ 
        this.route.params.subscribe((params: Params)=>{
          this.id = params['id'];
          if(this.documentService.getDocument(this.id)!==null){
          this.document = this.documentService.getDocument(this.id) }else{console.log("no error")}        
        })
      }
}
