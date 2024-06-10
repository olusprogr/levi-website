import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ErrorComponent } from './error/error.component';
import { ProductComponent } from './product/product.component';
import { InformationComponent } from './information/information.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home', component: StartComponent, title: 'Home'
    },
    {
        path: 'home/search', component: SearchComponent, title: 'Search'
    },
    {
        path: 'home/product/:productName', component: ProductComponent, title: 'Product'
    },
    {
        path: 'home/information', component: InformationComponent, title: 'Information'
    },
    {
        path: 'home/about-us', component: AboutUsComponent, title: 'About Us'
    },
    {
        path: '**', component: ErrorComponent, title: 'Not Found'
    }
];
