import { DataService } from './_helpers/data.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, //dependency of toastr module
    ToastrModule.forRoot(), // to use notification toaster
    ReactiveFormsModule, //to make reactive form
    HttpClientModule, // to use angular web api
    HttpClientInMemoryWebApiModule.forRoot(DataService),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
