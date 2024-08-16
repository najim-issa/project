import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent } from './main/main-dashboard/main-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component'; 
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { Ngmaterial } from './Ngmaterial';
import { AboutUsComponent } from './main/about-us/about-us.component';
import { ContactusComponent } from './main/contactus/contactus.component';
import { LoginComponent } from './main/login/login.component';
import { CollectorsComponent } from './admin/collectors/collectors.component';
import { HolderListComponent } from './admin/holder-list/holder-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomSnackbarComponent } from './admin/custom-snackbar/custom-snackbar.component';
import { EditdetailsComponent } from './admin/editdetails/editdetails.component';
import { Table2Component } from './admin/table2/table2.component';
import { EditCollectorComponent } from './admin/edit-collector/edit-collector.component';


@NgModule({
  declarations: [
    AppComponent,
    MainDashboardComponent,
    AdminDashboardComponent,
    AboutUsComponent,
    ContactusComponent,
    LoginComponent,
    CollectorsComponent,
    HolderListComponent,
    CustomSnackbarComponent,
    EditdetailsComponent,
    Table2Component,
    EditCollectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ngmaterial,
    HttpClientModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
