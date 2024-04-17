import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../../components';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private modalService: NgbModal) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = environment.endPoint;

    const modalRef = this.modalService.open(LoadingComponent, { centered: true, fullscreen: true,  windowClass: 'loading-modal' });

    return this.authService.accessToken$.pipe(

      switchMap((accessToken) => {
          const modifiedRequest = request.clone({
          url: `${baseUrl}/${request.url}`,
          setHeaders: {
            Authorization: `Bearer ${sessionStorage.getItem('@token') || accessToken}`
          }
        });

        //console.log('Modified Request URL:', modifiedRequest.url);

        return next.handle(modifiedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            modalRef.close();

            if (error.ok === false && error.status === 0)
              return throwError({message: 'Erro de conexão tente mais tarde.'});
            else if (error.status === 400) {
              return throwError(error.error);
            }
            else if (error.status === 401) {
              sessionStorage.clear();
              window.location.reload();
              return throwError({message: 'Erro de autenticação, tente atualizar a página ou realize novamente o login.'});
            }
            console.log(error);
            return throwError({message: 'Erro tente atualizar a página ou realize novamente o login..'});
          }),
          finalize(() => {
            modalRef.close();
          })
        );
      }),
      catchError((error) => {
        modalRef.close();
        console.log(error);
        return throwError(error);
      })
    );
  }
}
