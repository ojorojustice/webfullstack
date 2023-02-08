import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../../shared/message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{
  currentSender: string = "Ojo Rufus Olajide";
  id:string = '4';
  @ViewChild('subject') subjectInput!: ElementRef;
  @ViewChild('msgText') msgTextInput!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor(private messageService: MessageService){}
  ngOnInit(): void {    
  }
  
 onSendMessage(){
    const messageSender = this.currentSender;
    const id = this.id;
    const messageText = this.msgTextInput.nativeElement.value;
    const messageSubject = this.subjectInput.nativeElement.value;
    console.log(id,messageSubject,messageText,messageSender);
    const newMessage = new Message(id,messageSubject,messageText,messageSender);
    this.messageService.addMessage(newMessage)
    
  }
  onClear(){
    const messageSender = this.currentSender;
    const id =this.id;
    const messageText = "";
    const messageSubject = "";
    const newMessage = new Message(id,messageSubject,messageText,messageSender);
    this.addMessageEvent.emit(newMessage);
  }
}
