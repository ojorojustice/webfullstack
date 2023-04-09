import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(
    private authenticateService:AuthenticateService, 
    private flashMessagesService: FlashMessagesService,
    private router: Router){

  }

  ngOnInit(){

  }
  
  onLogOutClick(){
    this.authenticateService.logout()
this.flashMessagesService.show('You are logged out', {cssClass: 'alert-success', timeout:3000});
      this.router.navigate(['/login']);

  }

}
