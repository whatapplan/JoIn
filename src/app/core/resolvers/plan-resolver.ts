import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { finalize, tap } from 'rxjs/operators';
import { CrudService } from '../services/http/crud-service.service';
import { UiHelper } from '../services/helpers/toast.service';

@Injectable({
  providedIn: 'root',
})
export class PlanResolver implements Resolve<any> {
  constructor(private crud: CrudService, private ui: UiHelper) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this.ui.presentLoading();
    return this.crud
      .getPlanById(id)
      .pipe(finalize(() => this.ui.dismissLoading()));
  }
}
