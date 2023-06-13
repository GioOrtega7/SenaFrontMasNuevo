import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Core/auth/login/login.component';
import { HomeModule } from './Core/home/home.module';
import { HomeComponent } from './Core/home/home.component';
import { ChargeWheelComponent } from './Modules/Components/charge-wheel/charge-wheel.component';
import { ProgramaFormativoComponent } from './Modules/Components/programa-formativo/programa-formativo.component';
import { AreasComponent } from './Modules/Pages/areas/areas.component';
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
        component: AreasComponent
        /*loadChildren: () =>
          import("src/app/Modules/Components/charge-wheel/charge-wheel.component").then(
            (m) => m.ChargeWheelComponent
          ),*/
      },
      {
        path:"proyecto",
        component: ChargeWheelComponent
      },
      {
        path:"programa",
        component: ProgramaFormativoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
