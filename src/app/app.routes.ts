import { Routes } from '@angular/router';
import { CustomerComponent } from './Customer/Customer.component';
import { CustomerformComponent } from './Customerform/Customerform.component';
import { OwnerComponent } from './Owner/Owner.component';
import { OwnerformComponent } from './Ownerform/Ownerform.component';

export const routes: Routes = [


  { path: '', redirectTo: '/Customer', pathMatch: 'full' },
{path: 'Customer', component:CustomerComponent},
{path: 'Customerform/:id', component:CustomerformComponent},
{path: 'Owner', component:OwnerComponent},
{path: 'Ownerform/:id', component:OwnerformComponent},
{path: 'OwnerForm', component:OwnerformComponent},
{path: 'CustomerForm', component:CustomerformComponent},
];
