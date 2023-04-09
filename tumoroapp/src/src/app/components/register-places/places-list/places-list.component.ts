import { Component, EventEmitter, NgIterable, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlaceService } from './../place.service';
import { PlaceFilterPipe } from '../place-filter.pipe';

@Component({
  selector: 'app-places-list',
  templateUrl: './places-list.component.html',
  styleUrls: ['./places-list.component.css'],
  providers: [PlaceFilterPipe] 
})
export class PlacesListComponent implements OnInit, OnDestroy{
  places: Place[]|any;
    private subscription!: Subscription;
    place!: Place;
    term!: string;

constructor(private placeService: PlaceService){
 
}

search(value: string) {

  this.term = value;
  
  }


ngOnInit(){  
  this.places = this.placeService.getPlaces();
  this.subscription = this.placeService.placeListChangedEvent
  .subscribe((placeList: Place[]|any)=>{      
    this.places = placeList      
  })
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

onSelected(place: Place){
  console.log(place)
  this.placeService.placeSelectedEvent.emit(place);
  console.log(place)
}


}
