import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public identifiedUser: any;

  public userName: string;
  public userEmail: string;
  public userDescription: string;
  public userImage_url: string;

  //angular file uploader config
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "2",
    uploadAPI:  {
      url:"https://example-file-upload-api",
      method:"POST",
      headers: {
     "Content-Type" : "text/plain;charset=UTF-8",
     "Authorization" : `${this._userService.getToken()}`
      },
      responseType: 'blob',
    },
    theme: "dragNDrop",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
};
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.identifiedUser = this._userService.getIdentifiedUser();
    this.userName = this.identifiedUser.name;
    this.userEmail = this.identifiedUser.email;
    this.userDescription = this.identifiedUser.description;
    this.userImage_url = this.identifiedUser.image_url;
    if (this.userDescription == undefined) {
      this.identifiedUser.description = "";
      this.userDescription = "";
    }
  }

  public editUser(){
    this._userService.update({id: this.identifiedUser.sub, name: this.userName, email: this.userEmail, description: this.userDescription}).subscribe(
      (response) => {
        
        let newUser = {
          sub: response.updated_user.id,
          id: response.updated_user.id,
          name: response.updated_user.name,
          email: response.updated_user.email,
          description: response.updated_user.description,
          image_url: response.updated_user.image_url,
          role: response.updated_user.role
        }
        this._userService.persistUser({token: this._userService.getToken(), user: newUser});
      },
      (error) => {console.error(error)}
    );
  }

}
