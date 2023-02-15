import { Component, Input, OnInit } from '@angular/core';
import { Document } from  '../document.model';



@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent {
  @Input() document!: Document;
  @Input() index!: number;
  
  ngOnInit(){}
}


