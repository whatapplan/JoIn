import { Pipe, PipeTransform } from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'userRetrieving'
})
export class UserRetrievingPipe implements PipeTransform {

  constructor(private auth: AuthService){}
  transform(id: string) {
          return this.auth.getUserById(id);
  }

}
