import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should not login when form is invalid', () => {
    // Arrange
    const username = '';
    const password = '';
    const authServiceSpy = spyOn(authService, 'login');

    // Act
    component.loginForm.patchValue({ username, password });

    // Assert
    expect(authServiceSpy).not.toHaveBeenCalled();
  });

  it('should login successfully', () => {
    // Arrange
    const username = 'user';
    const password = 'password';
    const authServiceSpy = spyOn(authService, 'login').and.returnValue(of(true));

    // Act
    component.loginForm.patchValue({ username, password });
    component.login();

    // Assert
    expect(authServiceSpy).toHaveBeenCalledWith({ username, password });
  });

  it('should display error message when login fails', () => {
    // Arrange
    const username = 'user1';
    const password = 'password';
    const authServiceSpy = spyOn(authService, 'login').and.returnValue(of(false));

    // Act
    component.loginForm.patchValue({ username, password });
    component.login();

    // Assert
    expect(component.message).toBe('Invalid credentials');
  });
});
