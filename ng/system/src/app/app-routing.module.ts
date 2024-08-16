import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashboardComponent } from './main/main-dashboard/main-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { LoginComponent } from './main/login/login.component';
import { CollectorsComponent } from './admin/collectors/collectors.component';
import { HolderListComponent } from './admin/holder-list/holder-list.component';
import { Table2Component } from './admin/table2/table2.component';

const routes: Routes = [
  {path: "", component: MainDashboardComponent},
  {path: "aboutus", component: AboutUsComponent},
  {path: "login", component: LoginComponent},

  {path: "admin", component: AdminDashboardComponent,children:
    [
      {path:"collectors",component: CollectorsComponent},
      {path:"holderList",component: HolderListComponent},
      {path:"collectorstb",component: Table2Component},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
