import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
password:string;
username:string;

constructor(
  private authenticateService:AuthenticateService, 
  private flashMessagesService: FlashMessagesService,
  private router: Router){

}

ngOnInit(){

}
  onLoginSubmit(){
    const user ={
      username: this.username,
      password: this.password
    }
this.authenticateService.authenticateUser(user).subscribe(data=>{
  if((data as any).success){
this.authenticateService.storeUserData((data as any).token, (data as any).user);
this.flashMessagesService.show((data as any).msg, {cssClass: 'alert-success', timeout:3000});
      this.router.navigate(['dashboard']);
  }else{
    this.flashMessagesService.show((data as any).msg, {cssClass: 'alert-danger', timeout:3000});
      this.router.navigate(['login']);
  }
})
  }

  
}
