import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Core/auth/login/login.component';
import { HomeModule } from './Core/home/home.module';
import { HomeComponent } from './Core/home/home.component';
import { ChargeWheelComponent } from './Modules/Components/charge-wheel/charge-wheel.component';
import { ProgramaFormativoComponent } from './Modules/Components/programa-formativo/programa-formativo.component';
import { AreasComponent } from './Modules/Pages/areas-view/areas/areas.component';
import { ProyectoFormativoComponent } from './Modules/Pages/proyecto-formativo-view/proyecto-formativo/proyecto-formativo.component';
import { PerfilComponent } from './Modules/Pages/perfil/perfil.component';
import { AreasTryComponent } from './Modules/Pages/areas-try/areas-try.component';
import { GruposViewComponent } from './Modules/Pages/grupos-view/grupos-view.component';
import { DashboardComponent } from './Modules/Pages/dashboard/dashboard.component';
import { SubirArchivosComponent } from './Modules/Pages/subir-archivos/subir-archivos.component';
import { MaterialFormacionListComponent } from './material-formacion-list/material-formacion-list.component';
import { MaterialFormacionModalComponent } from './material-formacion-modal/material-formacion-modal.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./Core/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'areas',
        component: AreasComponent
      },
      {
        path:"proyecto",
        component: ProyectoFormativoComponent
      },
      {
        path:"programa",
        component: AreasTryComponent
      },
      {
        path:"perfil",
        component: PerfilComponent
      },
      {
        path:"Grupos",
        component: GruposViewComponent
      },
      {
        path:"prueba",
        component: SubirArchivosComponent
      },
      {
        path:"CRUD",
        component: MaterialFormacionListComponent
      },
      {
        path:"modalprueba",
        component: MaterialFormacionModalComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
