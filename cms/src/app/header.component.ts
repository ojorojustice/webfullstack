import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./app.component.css']
})
export class HeaderComponent {

  @Output() selectedHeaderEvent = new EventEmitter<string>();


  onSelected(selectedEvent: string){
    console.log(selectedEvent);
    this.selectedHeaderEvent.emit(selectedEvent);
  }

}
