import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../shared/message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageListChangedEvent = new Subject<Message[]>();
  messageChangedEvent = new EventEmitter<Message[]>();
  messages : Message[] = [];
  maxMessageId: number;

  constructor(private http:HttpClient) { 
    this.messages = MOCKMESSAGES;
    this.maxMessageId = this.getMaxId();
  }

  getMessages(){
    // return this.messages.slice();
    this.http.get("https://contactdocumentmessage-default-rtdb.firebaseio.com/messages.json").subscribe(
      // success method
      (messages: Message[]|any ) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        // sort the list of documents
        this.messages.sort((a: any, b:any) => a.id - b.id);
        // emit the next document list change event
        this.messageChangedEvent.next(this.messages.slice());
      },
      // error method
      (error: any) => {
        console.error(error);
      } 
    );
  }
  getMessage(id:string){
    return this.messages.find(message => message.id === id) || null;
  }

  addMessage(newMessage: Message){
    if (newMessage == null || newMessage == undefined) {
      return;
    }
    this.maxMessageId++;
      newMessage.id = String(this.maxMessageId);
      this.messages.push(newMessage);
    // this.messages.push(message)
    // this.messageChangedEvent.next(this.messages.slice())
    this.storeMessages()
  }

  storeMessages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const jsonMessages = JSON.stringify(this.messages);
    this.http.put('https://contactdocumentmessage-default-rtdb.firebaseio.com/messages.json', jsonMessages, { headers }).subscribe(() => {
      const messagesListClone = this.messages.slice();
    this.messageListChangedEvent.next(messagesListClone);
    });
  }

  getMaxId(): number {
    let maxId = 0  
    for (let i = 0; i < this.messages.length; i++) {
      const currentId = parseInt(this.messages[i].id);    
      if (currentId > maxId) {
        maxId = currentId;
      }
    }  
    return maxId
  }

}
