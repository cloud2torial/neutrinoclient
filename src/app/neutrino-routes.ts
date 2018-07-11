import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';

export const routes:Routes = [
    {
        path:'',
        component:LayoutComponent,
        children:[{
            path:'',
            loadChildren:'./home/home.module#HomeModule'
        }]
    },{
        path:'auth',
        children:[{
            path:'',
            loadChildren:'./auth/auth.module#AuthModule'
        }]
    }
]