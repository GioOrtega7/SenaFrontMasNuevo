import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Core/auth/auth.module';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthRoutingModule } from './Core/auth/auth-routing.module';
import { CoreModule } from './Core/core.module';
import { HomeModule } from './Core/home/home.module';
import { HomeRoutingModule } from './Core/home/home-routing.module';
import { PagesModule } from './Modules/Pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    CoreModule,
    HomeModule,
    HomeRoutingModule,
    PagesModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
