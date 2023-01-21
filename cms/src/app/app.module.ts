import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactDetailComponent,
    ContactListComponent,
    ContactsComponent,
    ContactItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
