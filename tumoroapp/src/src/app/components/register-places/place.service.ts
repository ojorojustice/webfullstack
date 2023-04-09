import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Place } from './place.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  placeListChangedEvent = new Subject<Place[]>();
  placeSelectedEvent = new EventEmitter<Place>();
  placeChangedEvent = new EventEmitter<Place>();
  places: Place[] = [] ;
  maxPlacesId: number;

  constructor(private http:HttpClient) { 
    this.maxPlacesId = this.getMaxId();
  }
getPlaces(){
  // return this.contacts.slice()
  this.http.get("http://localhost:3000/places/").subscribe(
      // success method
      (placesObjects: Place[]|any ) => {
        this.places = placesObjects.places;
        this.maxPlacesId = this.getMaxId();
        // sort the list of documents
        this.places.sort((a: any, b:any) => a.id - b.id);
        // emit the next document list change event
        this.placeListChangedEvent.next(this.places.slice());
        return this.places;
      },
      // error method
      (error: any) => {
        console.error(error);
      } 
    );
    return this.places;
}

getPlace(id: string) {
  return this.places[+id] || null
}


getMaxId(): number {

  let maxId = 0

  for (let i = 0; i < this.places.length; i++) {
    const currentId = parseInt(this.places[i].id);    
    if (currentId > maxId) {
      maxId = currentId;
    }
  }

  return maxId
}

addPlace(place: Place) {
  if (!place) {
    return;
  }

  // make sure id of the new Document is empty
  place.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, place: Place }>('http://localhost:3000/places/place',
  place,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.places.push(responseData.place);
        this.sortAndSend();
        
      }
    );
}

updatePlace(originalPlace: Place, newPlace: Place) {
  if (!originalPlace || !newPlace) {
    return;
  }

  const pos = this.places.findIndex(d => d.id === originalPlace.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newPlace.id = originalPlace.id;
  // newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/places/' + originalPlace.id,
    newPlace, { headers: headers })
    .subscribe(
      () => {
        this.places[pos] = newPlace;
        this.sortAndSend();
      }
    );
}


deletePlace(place: Place) {

  if (!document) {
    return;
  }

  const pos = this.places.findIndex(d => d.id === place.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/places/' + place.id)
    .subscribe(
      () => {
        this.places.splice(pos, 1);
        this.sortAndSend();
      }
    );
}


storePlaces() {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const jsonPlaces = JSON.stringify(this.places);
  this.http.put('https://contactdocumentmessage-default-rtdb.firebaseio.com/places.json', jsonPlaces, { headers }).subscribe(() => {
    const documentsListClone = this.places.slice();
  this.placeListChangedEvent.next(documentsListClone);
  });
}

sortAndSend(){
  this.places.sort((a,b)=>{
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  this.placeListChangedEvent.next(this.places.slice())
}
}
