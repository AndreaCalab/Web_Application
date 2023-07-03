import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VisualizzaImmobiliComponent } from './visualizza-immobili/visualizza-immobili.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddAnnuncioComponent } from './add-annuncio/add-annuncio.component';
import { UpdateAnnunciComponent } from './update-annunci/update-annunci.component';
import { EnterReviewComponent } from './enter-review/enter-review.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';


@NgModule({
  declarations: [
    AppComponent,
    VisualizzaImmobiliComponent,
    AddAnnuncioComponent,
    UpdateAnnunciComponent,
    EnterReviewComponent,
    AdminUsersComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
