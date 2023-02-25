import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document |null |undefined;
  document:Document | null | undefined;
  editMode: boolean = false;

  ngOnInit(){

  }

  onSubmit(form:NgForm){

  }
}
