import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ErrorComponent } from './error/error.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: StartComponent
    },
    {
        path: 'home/product/:productName', component: ProductComponent
    },
    {
        path: '**', component: ErrorComponent
    }
];
