import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { delay, finalize, map, switchMap, tap, timeout } from 'rxjs/operators';
import { CrudService } from '../services/http/crud-service.service';
import { UiHelper } from '../services/helpers/toast.service';
import { Plan } from '../models/plan';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PlanResolver implements Resolve<any> {
  constructor(
    private crud: CrudService,
    private auth: AuthService,
    private ui: UiHelper
  ) {}
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    this.ui.presentLoading(id);
    return this.crud.getPlanById(id).pipe(
      switchMap((plan) =>
        this.auth.getUserById(plan.createdBy).pipe(
          map((res) => ({ ...plan, creationUser: res })),
          finalize(() => this.ui.dismissLoading(id))
        )
      ),
    );
  }
}
