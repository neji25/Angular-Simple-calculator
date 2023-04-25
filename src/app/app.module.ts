import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CalculatorComponent} from "./components/calculator/calculator.component";
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { RoutesModule } from './routes/routes.module';
import {AuthService} from "./services/auth.service";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {JwtModule} from "@auth0/angular-jwt";
import { AllPostsComponent } from './components/blog/all-posts/all-posts.component';

export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    HeaderComponent,
    DashboardComponent,
    AllPostsComponent,
  ],
  imports: [
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['localhost:3000/login']
      }
    }),
    NgbModule,
    FormsModule,
    HttpClientModule,
    RoutesModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
