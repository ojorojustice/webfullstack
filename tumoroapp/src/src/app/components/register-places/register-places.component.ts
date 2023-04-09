import { Component, OnInit, Input } from '@angular/core';
import { Place } from './place.model';
import { PlaceService } from './place.service';

@Component({
  selector: 'app-register-places',
  templateUrl: './register-places.component.html',
  styleUrls: ['./register-places.component.css'],
  providers: [PlaceService]
})
export class RegisterPlacesComponent implements OnInit {
  selectedPlace!: Place ;
 

  constructor(private placeService: PlaceService){}
 
  ngOnInit() {
    this.placeService.placeSelectedEvent.subscribe(
     (place:Place)=>{
       console.log("here", this.selectedPlace)
       this.selectedPlace= place
       console.log("here", this.selectedPlace)
     }
    )
  }

}
