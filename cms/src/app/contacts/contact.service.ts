import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [] 

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
getContacts(){
  return this.contacts.slice()
}
getContact(id: string) {
  return this.contacts[+id] || null
}
deleteContact(contact: Contact) {
  const index = this.contacts.findIndex(conct => conct.id === contact.id);
  if (index === -1) {
     return;
  }
  this.contacts.splice(index, 1);
  this.contacts.slice()
  for (const doc of this.contacts) {
     this.contactChangedEvent.emit(doc);
  }
}
}
