import { Component, EventEmitter , Output,Input, OnInit} from '@angular/core';
import { Message } from '../../shared/message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  messages: Message[]=[]
 
constructor( private messageService: MessageService){}

onMessageAdded(message:Message){
  this.messages.push(message);
}
  
ngOnInit(): void {
  this.messages = this.messageService.getMessages()
  console.log(this.messages)
  this.messageService.messageChangedEvent.subscribe((messages:Message[])=>{
    this.messages = messages;
  })
}

}
