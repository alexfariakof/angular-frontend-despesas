import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../../components/loading-component/loading.component';
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private modalService: NgbModal) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl = environment.endPoint;

    const modalRef = this.modalService.open(LoadingComponent, { centered: true, backdropClass: 'loading-modal',  windowClass: 'loading-modal' });

    return this.authService.accessToken$.pipe(

      switchMap((accessToken) => {
          const modifiedRequest = request.clone({
          url: `${baseUrl}/${request.url}`,
          setHeaders: {
            Authorization: `Bearer ${accessToken || localStorage.getItem('@dpApiAccess')}`
          }
        });

        console.log('Modified Request URL:', modifiedRequest.url);

        return next.handle(modifiedRequest).pipe(
          catchError((error: HttpErrorResponse) => {
            modalRef.close();

            if (error.ok === false && error.status === 0)
              return throwError({message: 'Erro de conexão tente mais tarde.'});
            else if (error.status === 401) {
              return throwError({message: 'Erro de autenticação, tente atualizar a página ou realize novamente o login.'});
            }
            return throwError(error);
          }),
          finalize(() => {
            modalRef.close();
          })
        );
      }),
      catchError((error) => {
        modalRef.close();
        return throwError(error);
      })
    );
  }
}
