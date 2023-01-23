import { Component, EventEmitter , Output,Input} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: Message[]=[
    new Message(1,"My Institute","Preparing for Eternal Family","Ojo Rufus Olajide"),
    new Message(2,"My Course","Marriage and Family Studies","Ojo Rufus Olajide"),
    new Message(3,"My School","Brigham Young Universtiy","Ojo Rufus Olajide"),
    new Message(4,"My Marriage Status","I am happily Married","Ojo Rufus Olajide")]; 
 

onMessageAdded(message:Message){
  this.messages.push(message);
}
  

}
