import { TestBed } from '@angular/core/testing';

import { AdminAuthGuardService } from './admin/components/services/admin-auth-guard.service';

describe('AdminAuthGuardService', () => {
  let service: AdminAuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
