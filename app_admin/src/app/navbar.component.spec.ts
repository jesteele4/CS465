import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthenticationService } from './services/authentication.service';
import { By } from '@angular/platform-browser';

class MockAuthenticationService {
  isLoggedIn = jasmine.createSpy('isLoggedIn').and.returnValue(true);
  logout = jasmine.createSpy('logout');
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: MockAuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if user is logged in', () => {
    expect(component.isLoggedIn()).toBeTrue();
    expect(authService.isLoggedIn).toHaveBeenCalled();
  });

  it('should log out the user', () => {
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should display "Log In" when the user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();
    const loginLink = fixture.debugElement.query(By.css('.nav-item[routerLink="login"]'));
    expect(loginLink).toBeTruthy();
  });

  it('should display "Log Out" when the user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();
    const logoutLink = fixture.debugElement.query(By.css('.nav-item[click="onLogout()"]'));
    expect(logoutLink).toBeTruthy();
  });
});