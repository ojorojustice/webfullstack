import { Component, Input, OnInit } from '@angular/core';
import { Place} from '../place.model';

@Component({
  selector: 'app-places-item',
  templateUrl: './places-item.component.html',
  styleUrls: ['./places-item.component.css']
})
export class PlacesItemComponent implements OnInit {
  @Input() place!: Place;
  @Input() index!: number;

constructor(){}

ngOnInit() {
}

}
