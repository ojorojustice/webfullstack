import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-places-edit',
  templateUrl: './places-edit.component.html',
  styleUrls: ['./places-edit.component.css']
})
export class PlacesEditComponent {
  // groupPlaces: Place[] =[];
  originalPlace!: Place | any;
  place!:Place;
  editMode: boolean = false;
  id!:string;

  constructor(private placeService: PlaceService,
    private router: Router,
    private route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']; 

      if (this.id == null || this.id == undefined) { 
        this.editMode = false;
        return;
      }

      this.originalPlace = this.placeService.getPlace(this.id);
      if (this.originalPlace == null || this.originalPlace == undefined) {
        return;
      }

      this.editMode = true;
      this.place = JSON.parse(JSON.stringify(this.originalPlace));

      // if (this.place.group) { 
      //   this.groupPlaces = JSON.parse(JSON.stringify(this.groupContacts));
      // }
    });
  }

  onSubmit(form:NgForm){

    const value = form.value;
    const newPlace:any = new Place('',value.name,value.email,value.phone);

    if (this.editMode) {
      this.placeService.updatePlace(this.originalPlace, newPlace);
    } else {
      this.placeService.addPlace(newPlace);
    }

    this.router.navigateByUrl('/places');
  }

  onCancel() {
    this.router.navigateByUrl('/places');
    }    

    
isInvalidContact(newPlace: Place) {
  if (!newPlace) {
    return true;
  }
  if (this.place && newPlace.id === this.place.id) {
     return true;
  } 
  return false;
}


// addToGroup($event: any) {
//   const selectedContact: Contact = $event.dragData;
//   const invalidGroupContact = this.isInvalidContact(selectedContact);
//   if (invalidGroupContact){
//      return;
//   }
//   this.groupContacts.push(selectedContact);
  
// }

// onRemoveItem(index: number) {
//   if (index < 0 || index >= this.groupContacts.length) {
//      return;
//   }
//   this.groupContacts.splice(index, 1);
// }

}
