import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: any;

  constructor(private authenticateService:AuthenticateService, 
    private flashMessagesService: FlashMessagesService,
    private router: Router){

  }

  ngOnInit(): void {
    this.authenticateService.getProfile().subscribe(profile =>{
      this.user = (profile as any).user;
      console.log("I am here " + this.user)
    }, err =>{
      console.log(err);
    }
      
    )
  }

}
