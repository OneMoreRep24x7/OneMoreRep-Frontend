import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  
  
  constructor(private service:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const BASE_URL = "http://localhost:8080/"
    let apiRequest = req.clone({
      url:BASE_URL+req.url
    })
    

    let accessToken = this.service.getAccessToken();
    if(accessToken) {
      apiRequest  = apiRequest.clone({
        setHeaders : {
          Authorization : `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(apiRequest).pipe(
      tap(
          (event) => {
              if (event.type === HttpEventType.Response && event.status === 200) {
                  const { accessToken, user } = event.body;

                  if (accessToken) {
                      // Update the access token in the service
                      this.service.setAccessToken(accessToken);
                      apiRequest.clone({
                          setHeaders:{
                              Authorization: `Bearer ${accessToken}`
                          }
                      })
                      console.log("Updated access token:", accessToken);
                  }

                  console.log("Response from body:", event.body);
              }
          },
          catchError((error) => {
              if (error.status === 403 ) {
                 
                  console.log("Unauthorized error. Redirect to login page or refresh token.");
                  
                  // return this.handleUnauthorizedError()
                  //here wirte the logic of refresh token 

              }
              return throwError(error);
          })
      )
  );

    throw new Error('Method not implemented.');
  }
}
