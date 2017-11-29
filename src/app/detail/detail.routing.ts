import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from 'app/detail/detail.component';

const routes: Routes = [
  { 
      path: ':part/:page',
      component: DetailComponent
   },
];

export const DetailRoutes = RouterModule.forChild(routes);
