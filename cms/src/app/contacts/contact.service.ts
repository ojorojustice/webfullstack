import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [] 

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
getContacts(){
  return this.contacts.slice()
}
getContact(id:string){
  this.contacts.forEach((contact)=>{
  if(contact.id === id){
    return 
  }})
  return null
}



}
