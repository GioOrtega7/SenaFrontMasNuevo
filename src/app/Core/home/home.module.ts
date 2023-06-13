import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { BarComponent } from './nav-bar-/bar/bar.component';
import { SideMenuComponent } from './nav-bar-/side-menu/side-menu.component';
import { CoreModule } from '../core.module';
import { ComponentsModule } from 'src/app/Modules/Components/components.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home.component';
import { ProgramaFormativoComponent } from 'src/app/Modules/Components/programa-formativo/programa-formativo.component';
import { NavBarModule } from './nav-bar-/nav-bar.module';
import { PagesModule } from 'src/app/Modules/Pages/pages.module';




@NgModule({
  declarations: [
  FooterComponent,
  BarComponent,
  SideMenuComponent,
  NavbarComponent,
  HomeComponent,
  NavbarComponent,


  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
    PagesModule
  ],
  exports:[HomeComponent,
  NavbarComponent]
})
export class HomeModule { }
