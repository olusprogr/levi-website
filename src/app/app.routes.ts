import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { ErrorComponent } from './error/error.component';
import { ProductComponent } from './product/product.component';
import { InformationComponent } from './information/information.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ActivityComponent } from './admin-panel/activity/activity.component';
import { LoginComponent } from './login/login.component';
import { AiChatComponent } from './admin-panel/ai-chat/ai-chat.component';

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
        path: 'home/login', component: LoginComponent, title: 'Login'
    },
    {
        path: 'home/admin-panel/:admin', component: AdminPanelComponent, title: 'Admin Panel', children: [
            {
                path: 'activity', component: ActivityComponent, title: 'Activity'
            },
            {
                path: 'ai-chat', component: AiChatComponent, title: 'AI Chat'
            }
        ]
    },
    {
        path: '**', component: ErrorComponent, title: 'Not Found'
    }
];
