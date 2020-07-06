import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AddContactComponent,
    ListContactsComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
