import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from './../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']  
})
export class ContactListComponent implements OnInit, OnDestroy{  
    contacts!: Contact[];
    private subscription!: Subscription

constructor(private contactService: ContactService){
 
}


ngOnInit(){  
  this.contacts = this.contactService.getContacts();
  this.subscription = this.contactService.contactListChangedEvent
  .subscribe((contactList: Contact[])=>{      
    this.contacts = contactList      
  })
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

onSelected(contact: Contact){
  console.log(contact)
  this.contactService.contactSelectedEvent.emit(contact);
  console.log(contact)
}


}


