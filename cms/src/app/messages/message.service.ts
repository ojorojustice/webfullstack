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
    this.http.get("http://localhost:3000/messages").subscribe(
      // success method
      (messagesObjects: Message[]|any ) => {
        this.messages = messagesObjects.messages;
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


  addMessage(message: Message) {
    if (!message) {
      return;
    }

    // make sure id of the new Document is empty
    message.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ messsage: string, message: Message }>('http://localhost:3000/messages',
      message,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.messages.push(responseData.message);
          this.sortAndSend();
          
        }
      );
  }

  // addMessage(newMessage: Message){
  //   if (newMessage == null || newMessage == undefined) {
  //     return;
  //   }
  //   this.maxMessageId++;
  //     newMessage.id = String(this.maxMessageId);
  //     this.messages.push(newMessage);
  //   // this.messages.push(message)
  //   // this.messageChangedEvent.next(this.messages.slice())
  //   this.storeMessages()
  // }

  storeMessages() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const jsonMessages = JSON.stringify(this.messages);
    this.http.put('http://localhost:3000/messages', jsonMessages, { headers }).subscribe(() => {
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

  sortAndSend(){
    this.messages.sort((a,b)=>{
      if (a.sender < b.sender) {
        return -1;
      }
      if (a.sender > b.sender) {
        return 1;
      }
      return 0;
    });
    this.messageListChangedEvent.next(this.messages.slice())
  }

}
