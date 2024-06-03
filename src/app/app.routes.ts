import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ErrorComponent } from './error/error.component';
import { ProductComponent } from './product/product.component';
import { InformationComponent } from './information/information.component';
import { AboutUsComponent } from './about-us/about-us.component';

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
        path: 'home/information', component: InformationComponent
    },
    {
        path: 'home/about-us', component: AboutUsComponent
    },
    {
        path: '**', component: ErrorComponent
    }
];
