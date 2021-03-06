import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userToRegister: User;
  constructor() { 
    this.userToRegister = new User( 0, "", "", "", "", "", "" );
    /**
     *  public id: number,
        public name: string,
        public email: string,
        public password: string,
        public image_url: string,
        public description: string,
        public role: string
     */
  }

  ngOnInit(): void {
  }

  public onUserSubmit(){
    console.log(this.userToRegister);
  }

}
