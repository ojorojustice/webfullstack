import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
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
  nativeWindow: any;

    constructor(private documentService:DocumentService,private route:ActivatedRoute, private winrefService: WinRefService, private router:Router){
      this.nativeWindow = this.winrefService.getNativeWindow()
    }
      ngOnInit(){ 
        this.route.params.subscribe((params: Params)=>{
          this.id = params['id'];
          console.log(params['id'])          
          this.document = this.documentService.getDocument(this.id) 
        })
      }

      onView(){
        if(this.document?.url){
          console.log(this.document.url)
          this.nativeWindow.open(this.document.url)
        }
      }

      onDelete() {
        this.documentService.deleteDocument(this.document!);
        this.router.navigate(['/documents']);
      }
}
