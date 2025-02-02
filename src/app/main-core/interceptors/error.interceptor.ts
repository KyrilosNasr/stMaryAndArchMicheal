import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from '@angular/core';
import { catchError, delay } from "rxjs/operators";
import { NavigationExtras, Router } from "@angular/router";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private router: Router,
    // private toastr: ToastrService
    ){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return  next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if(error){
            if(error.status === 400){
              // this.toastr.error(error.error.message, error.error.statusCode)
            }
            if(error.status === 401){
              // this.toastr.error(error.error.message, error.error.statusCode)
            }
            if(error.status === 404){
              this.router.navigateByUrl('/404')
            }
            if(error.status === 500){
              const navigationExtras : NavigationExtras = {state: {error: error.error}}
              this.router.navigateByUrl('/500', navigationExtras)
            }
          }
          return throwError(error)
        })
      )
  }

}
