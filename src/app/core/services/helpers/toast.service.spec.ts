import { TestBed } from '@angular/core/testing';

import { UiHelper } from './toast.service';

describe('ToastService', () => {
  let service: UiHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
