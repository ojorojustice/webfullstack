import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [] 

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
getContacts(){
  return this.contacts.slice()
}
getContact(id: string) {
  return this.contacts.find(contact => contact.id === id) || null;
}
}
