import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'cms';
@Input() selectedHeader: string = 'documents';

switchView(selectedFeature: string){
  this.selectedHeader = selectedFeature;
}

}
