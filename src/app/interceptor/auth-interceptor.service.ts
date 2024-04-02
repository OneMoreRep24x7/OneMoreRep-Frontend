import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { CommonState } from '../store/common/common.state';
import { setLoadingSpinner } from '../store/common/common.action';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private service: AuthService,
    private store : Store<CommonState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const BASE_URL = 'http://localhost:8765/';
    let apiRequest = req.clone({
      url: BASE_URL + req.url,
    });

    let accessToken = this.service.getAccessToken();
    if (accessToken) {
      apiRequest = apiRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    
      this.store.dispatch(setLoadingSpinner({status:true}))
     

    return next.handle(apiRequest).pipe(
      tap(
        (event) => {
          if (event.type === HttpEventType.Response && event.status === 200) {
            const { accessToken, user } = event.body;

            if (accessToken) {
              // Update the access token in the service
              this.service.setAccessToken(accessToken);
              apiRequest.clone({
                setHeaders: {
                  Authorization: `Bearer ${accessToken}`,
                },
              });
              console.log('Updated access token:', accessToken);
            }

            console.log('Response from body:', event.body);
          }
        },
        catchError((error) => {
          if (error.status === 403) {
            console.log('unauthorized');
          }
          return throwError(error);
        })
      ),
      finalize(()=>{
      
        this.store.dispatch(setLoadingSpinner({status: false}))
        

      })
    
    );
    throw new Error('Method not implemented.');
  }
}
