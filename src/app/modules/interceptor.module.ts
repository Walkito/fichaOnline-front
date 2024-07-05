import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { InterceptorService } from '../utils/interceptor.service';


@NgModule({
  providers: [
    Router,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true,
  }],
})

export class HttpInterceptorModule {

}
