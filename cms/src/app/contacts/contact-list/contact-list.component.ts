import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from './../contact.service';
import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ContactsFilterPipe] 
})
export class ContactListComponent implements OnInit, OnDestroy{  
    contacts!: Contact[];
    private subscription!: Subscription;
    contact!: Contact;
    term!: string;

constructor(private contactService: ContactService){
 
}

search(value: string) {

  this.term = value;
  
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


