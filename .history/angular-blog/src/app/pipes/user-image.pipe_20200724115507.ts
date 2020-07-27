import { Pipe, PipeTransform } from '@angular/core';
import { global } from '../services/global';
@Pipe({
  name: 'userImage'
})
export class UserImagePipe implements PipeTransform {

  transform(image_url: string): string {
    if(image_url == "" || image_url == null)
      return "assets/user_default.png";
    else{
      return `${global.url_api}/users/${image_url.split('/')[1].split('-')[0]}/image`
    }
  }

}
