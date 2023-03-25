import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [] ;
  maxContactId: number;

  constructor(private http:HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
getContacts(){
  // return this.contacts.slice()
  this.http.get("http://localhost:3000/contacts").subscribe(
      // success method
      (contactsObjects: Contact[]|any ) => {
        this.contacts = contactsObjects.contacts;
        this.maxContactId = this.getMaxId();
        // sort the list of documents
        this.contacts.sort((a: any, b:any) => a.id - b.id);
        // emit the next document list change event
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      // error method
      (error: any) => {
        console.error(error);
      } 
    );
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

addContact(contact: Contact) {
  if (!contact) {
    return;
  }

  // make sure id of the new Document is empty
  contact.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
  contact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.contacts.push(responseData.contact);
        this.sortAndSend();
        
      }
    );
}


// addContact(newContact: Contact | null ) {
//   if (newContact == null || newContact == undefined) {
//     return;
//   }
//   this.maxContactId++;
//     newContact.id = String(this.maxContactId);
//     this.contacts.push(newContact);
//     // const contactsListClone = this.contacts.slice();
//     // this.contactListChangedEvent.next(contactsListClone);
//     this.storeContacts();  
// }


updateContact(originalContact: Contact, newContact: Contact) {
  if (!originalContact || !newContact) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === originalContact.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newContact.id = originalContact.id;
  // newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
    .subscribe(
      () => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
    );
}

// updateContact(originalContact: Contact, newContact: Contact) {
//   if (originalContact == null || newContact == null) {
//     return;
//   }

//   const pos = this.contacts.indexOf(originalContact);
//   if (pos < 0) {
//     return;
//   }

//   newContact.id = originalContact.id;
//   this.contacts[pos] = newContact;
//   // const contactsListClone = this.contacts.slice();
//   // this.contactListChangedEvent.next(contactsListClone);
//   this.storeContacts();
// }


deleteContact(contact: Contact) {

  if (!document) {
    return;
  }

  const pos = this.contacts.findIndex(d => d.id === contact.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + contact.id)
    .subscribe(
      () => {
        this.contacts.splice(pos, 1);
        this.sortAndSend();
      }
    );
}



// deleteContact(contact:Contact) {
//   if (contact == null) {
//     return;
//   }

//   const pos = this.contacts.indexOf(contact);
//   if (pos < 0) {
//     return;
//   }

//   this.contacts.splice(pos, 1);
//   // const contactsListClone = this.contacts.slice();
//   // this.contactListChangedEvent.next(contactsListClone);
//   this.storeContacts()
// }

storeContacts() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const jsonContacts = JSON.stringify(this.contacts);
  this.http.put('https://contactdocumentmessage-default-rtdb.firebaseio.com/contacts.json', jsonContacts, { headers }).subscribe(() => {
    const documentsListClone = this.contacts.slice();
  this.contactListChangedEvent.next(documentsListClone);
  });
}

sortAndSend(){
  this.contacts.sort((a,b)=>{
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  this.contactListChangedEvent.next(this.contacts.slice())
}
}
