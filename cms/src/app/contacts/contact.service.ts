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
  contacts: Contact[] = [] ;
  maxContactId: number;

  constructor() { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
getContacts(){
  return this.contacts.slice()
}
getContact(id: string) {
  return this.contacts[+id] || null
}
// deleteContact(contact: Contact) {
//   const index = this.contacts.findIndex(conct => conct.id === contact.id);
//   if (index === -1) {
//      return;
//   }
//   this.contacts.splice(index, 1);
//   this.contacts.slice()
//   for (const doc of this.contacts) {
//      this.contactChangedEvent.emit(doc);
//   }
// }

getMaxId(): number {

  let maxId = 0

  for (let i = 0; i < this.contacts.length; i++) {
    const currentId = parseInt(this.contacts[i].id);    
    if (currentId > maxId) {
      maxId = currentId;
    }
  }

  return maxId
}

addContact(newContact: Contact | null ) {
  if (newContact == null || newContact == undefined) {
    return;
  }
  this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);  
}

updateContact(originalContact: Contact, newContact: Contact) {
  if (originalContact == null || newContact == null) {
    return;
  }

  const pos = this.contacts.indexOf(originalContact);
  if (pos < 0) {
    return;
  }

  newContact.id = originalContact.id;
  this.contacts[pos] = newContact;
  const contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(contactsListClone);
}

deleteContact(contact:Contact) {
  if (contact == null) {
    return;
  }

  const pos = this.contacts.indexOf(contact);
  if (pos < 0) {
    return;
  }

  this.contacts.splice(pos, 1);
  const contactsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(contactsListClone);
}
}
