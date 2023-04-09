import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Place } from '../place.model';
import { PlaceService } from '../place.service';

@Component({
  selector: 'app-places-detail',
  templateUrl: './places-detail.component.html',
  styleUrls: ['./places-detail.component.css']
})
export class PlacesDetailComponent implements OnInit{
  place!: Place | null;
 id!: string;


constructor(private placeService:PlaceService,private route:ActivatedRoute, private router:Router){

}
  ngOnInit(){
    this.route.params.subscribe((params: Params)=>{
      this.id = params['id'];
      console.log(params['id'])          
      this.place = this.placeService.getPlace(this.id) 
    })  
  }  

  onDelete() {
    this.placeService.deletePlace(this.place!);
    this.router.navigate(['/places']);
  }
  

}
