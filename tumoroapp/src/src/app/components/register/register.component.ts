import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessage } from 'angular2-flash-messages/module/flash-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:string;
  username: string;
  email:string;
  password:string;


 constructor(private validateService:ValidateService, private flashMessagesService: FlashMessagesService){
 }

  ngOnInit(){

  }
  onRegisterSubmit(){
    const user = {
      name : this.name,
      username :this.username,
      email :this.email,
      password :this.password,
    }
  
    if(!this.validateService.validateRegister(user)){
      this.flashMessagesService.show("Please all fields are required", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
  
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessagesService.show("Please use a valid email", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }
  
    // Validation successful, return true or nothing
    return true;
  }
}
