import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { MenuComponent } from './menu/menu.component';
import { PreviewComponent } from './preview/preview.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: 'welcome/:id', component: WelcomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'thank-you', component: ThankYouComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
