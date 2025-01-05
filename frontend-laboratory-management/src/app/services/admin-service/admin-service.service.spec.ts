import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin-service.service';
import { Utilisateur } from '../../models/utilisateur.model';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  const mockUser: Utilisateur = {
    id: 1,
    email: 'test@example.com',
    nomComplet: 'Test User',
    password: 'password123',
    profession: 'Developer',
    numTel: '1234567890',
    signature: 'Signature',
    role: 'User',
    laboratoireId: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users via GET', () => {
    service.getUsers().subscribe((users) => {
      expect(users).toEqual([mockUser]);
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users');
    expect(req.request.method).toBe('GET');
    req.flush([mockUser]);
  });

  it('should fetch a user by ID via GET', () => {
    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a new user via POST', () => {
    service.createUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });

  it('should delete a user via DELETE', () => {
    service.deleteUser(1).subscribe((response) => {
      expect(response).toBeNull();  // Change to expect null
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);  // Ensure null is passed
  });

  it('should fetch a user by email via GET', () => {
    const email = 'test@example.com';
    service.getUserByEmail(email).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`http://localhost:8082/api/users/search/findByEmail?email=${email}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should update a user via PUT', () => {
    service.updateUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users/update');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });

  it('should validate old password via POST', () => {
    service.validateOldPassword('test@example.com', 'oldPassword123').subscribe((isValid) => {
      expect(isValid).toBeTrue();
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users/validate-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', oldPassword: 'oldPassword123' });
    req.flush(true);
  });

  it('should send a password recovery email via POST', () => {
    service.sendPasswordRecoveryEmail('test@example.com').subscribe((response) => {
      expect(response).toBeNull();  // Change to expect null
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users/recover-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com' });
    req.flush(null);  // Ensure null is passed
  });

  it('should validate a reset code via POST', () => {
    service.validateResetCode('test@example.com', 'resetCode123').subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users/validate-reset-code');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'test@example.com', resetCode: 'resetCode123' });
    req.flush({ success: true });
  });

  it('should reset the password via POST', () => {
    service.resetPassword('test@example.com', 'resetCode123', 'newPassword123').subscribe((response) => {
      expect(response).toEqual({ success: true });
    });

    const req = httpMock.expectOne('http://localhost:8082/api/users/reset-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'test@example.com',
      resetCode: 'resetCode123',
      newPassword: 'newPassword123',
    });
    req.flush({ success: true });
  });
});
