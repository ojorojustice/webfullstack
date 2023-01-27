import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../../shared/message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{
  currentSender: string = "Ojo Rufus Olajide";
  id:number = 4;
  @ViewChild('msgText') msgTextInput!: ElementRef;
  @ViewChild('subject') subjectInput!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor(){}
  ngOnInit(): void {    
  }
  

  onSendMessage(){
    const messageSender = this.currentSender;
    const id = this.id + 1;
    const messageText = this.msgTextInput.nativeElement.value;
    const messageSubject = this.subjectInput.nativeElement.value;
    const newMessage = new Message(id,messageSubject,messageText,messageSender);
    this.addMessageEvent.emit(newMessage);
    
  }
  onClear(){
    const messageSender = this.currentSender;
    const id =this.id + 1;
    const messageText = "";
    const messageSubject = "";
    const newMessage = new Message(id,messageText,messageSubject,messageSender);
    this.addMessageEvent.emit(newMessage);
  }

}
