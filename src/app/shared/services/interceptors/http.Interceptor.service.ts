import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = environment.endPoint;

    return this.authService.accessToken$.pipe(

      switchMap((accessToken) => {
          const modifiedRequest = request.clone({
          url: `${baseUrl}/${request.url}`,
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        console.log('Modified Request URL:', modifiedRequest.url);


        return next.handle(modifiedRequest);
      })
    );
  }
}
