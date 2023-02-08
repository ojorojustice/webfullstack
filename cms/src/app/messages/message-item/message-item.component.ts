import { Component,Input, OnInit } from '@angular/core';
import { Message } from '../../shared/message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit{
  @Input() message!: Message;
  messageSender!: string;
  constructor(private contactService: ContactService) {}
  ngOnInit() {  
  const contact = this.contactService.getContact(this.message.sender)
  console.log(contact, contact?.name)      
  this.messageSender =  contact!.name 
    }
}
