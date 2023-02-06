import { Component, OnInit, Input } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit{
  selectedContact!: Contact ;
 

 constructor(private contactService: ContactService){}

 ngOnInit() {
   this.contactService.contactSelectedEvent.subscribe(
    (contact:Contact)=>{
      console.log("here", this.selectedContact)
      this.selectedContact= contact
      console.log("here", this.selectedContact)
    }
   )
 }
}
