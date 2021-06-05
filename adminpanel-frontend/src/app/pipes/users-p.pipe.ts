import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersP'
})
export class UsersPPipe implements PipeTransform {

  transform(role: string): string {
    return role === 'ADMIN_ROLE' ? 'ADMIN' : 'USER';
  }

}
