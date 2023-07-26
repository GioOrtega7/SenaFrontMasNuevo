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
import { MaterialFormacionListComponent } from './material-formacion-list/material-formacion-list.component';
import { MaterialFormacionCreateComponent } from './Modules/Pages/material-formacion-create/material-formacion-create.component';
import { MaterialFormacionEditComponent } from './material-formacion-edit/material-formacion-edit.component';
import { MaterialFormacionModalComponent } from './material-formacion-modal/material-formacion-modal.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importa MatInputModule
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AppComponent,
    MaterialFormacionListComponent,
    MaterialFormacionCreateComponent,
    MaterialFormacionEditComponent,
    MaterialFormacionModalComponent,
    
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
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
