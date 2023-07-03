import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizzaImmobiliComponent } from './visualizza-immobili/visualizza-immobili.component';
import { AddAnnuncioComponent } from './add-annuncio/add-annuncio.component';
import { UpdateAnnunciComponent } from './update-annunci/update-annunci.component';
import { EnterReviewComponent } from './enter-review/enter-review.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  {path: 'visualizzaimmobili', component: VisualizzaImmobiliComponent},
  {path:'addannuncio',component: AddAnnuncioComponent},
  {path:'updateannucio',component: UpdateAnnunciComponent},
  {path:'enterreview',component:EnterReviewComponent},
  {path:'adminusers',component:AdminUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
