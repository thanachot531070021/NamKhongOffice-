import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSidbarComponent } from './auth-sidbar.component';

describe('AuthSidbarComponent', () => {
  let component: AuthSidbarComponent;
  let fixture: ComponentFixture<AuthSidbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSidbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
