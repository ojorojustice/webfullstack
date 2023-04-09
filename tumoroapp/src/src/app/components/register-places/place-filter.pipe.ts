import { Pipe, PipeTransform } from '@angular/core';
import { Place } from './place.model';


@Pipe({
  name: 'placeFilter'
})
export class PlaceFilterPipe implements PipeTransform {

  transform(places: Place[], term: string): any {
    let filteredPlaces: Place[] =[];  
   if (term && term.length > 0) {
      filteredPlaces = places.filter(
         (place:Place) => place.name.toLowerCase().includes(term.toLowerCase())
      );
   }
   if (filteredPlaces.length < 1){
      return places;
   }
   return filteredPlaces;
  }
}
