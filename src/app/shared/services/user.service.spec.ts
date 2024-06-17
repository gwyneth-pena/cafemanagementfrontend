import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let loginParamsSuccess = {
    email: "test@email.com",
    password: "P@ssw0rd"
  };
  let loginParamsFailed = {
    email: "test@email2.com",
    password: "P@ssw0rd"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token after successful login', ()=>{

    const body = {token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnd2VucGVuYTIxQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImV4cCI6MTcxNDIzNDczOSwiaWF0IjoxNzE0MTk4NzM5fQ.yZoIg8pjcXEnnQnH8GQiiDcwTWsVqij4V_CbHiDnc2s"};
    const responseStatus = {
      status: 200,
      statusText: "OK"
    };
    
    service.login(loginParamsSuccess).subscribe({
      next:response=>{
        expect(Object.keys(response).length).toEqual(1);
        expect(response.token).toBeDefined();
      }
    });

    let req = httpMock.expectOne(`${service.url}/user/login`);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    expect(req.request.method).toEqual('POST');
    req.flush(body, responseStatus);
    httpMock.verify();
  });


  it('should return "Invalid Credentials" after unsuccessful login (due to wrong email or password)',()=>{
    const errorResponse = {
      status: 400,
      statusText: "Bad Request"
    };

    const body = {
      message: "Invalid Credentials"
    };

    service.login(loginParamsFailed).subscribe({
      next:response=>{
      },
      error: err=>{
        expect(err.status).toEqual(400);
        expect(err.error.message).toEqual(body.message);
      }
    });

    let req = httpMock.expectOne(`${service.url}/user/login`);
    expect(req.request.method).toEqual("POST");
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(body, errorResponse);

    httpMock.verify();

  });

});
