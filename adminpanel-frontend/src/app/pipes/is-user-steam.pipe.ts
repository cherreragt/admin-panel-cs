import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isUserSteam'
})
export class IsUserSteamPipe implements PipeTransform {

  transform(steam:boolean): string {
    return steam ? 'YES' : 'NO';
  }

}
