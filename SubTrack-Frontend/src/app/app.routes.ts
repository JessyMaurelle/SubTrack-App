import { Routes } from '@angular/router';
import { SubscriptionsTable } from './features/subscriptions/subscriptions-table/subscriptions-table';
import { Dashboard } from './features/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirection par défaut vers la liste,
  
  { path: 'dashboard', 
    loadComponent:()=> 
      import('./features/dashboard').then(m => m.Dashboard) 
  },
  { path: 'subscriptions', 
    loadComponent:()=>
      import('./features/subscriptions/subscriptions-table/subscriptions-table').then(m=> m.SubscriptionsTable)
  },
  { path: 'settings', 
    loadComponent:()=>
      import('./features/settings').then(m=> m.Settings)
  },
 
  { path: '**', redirectTo: 'dashboard' } 
];
