import { Routes, RouterModule } from '@angular/router';
import SignIn from './signin/signin.components';
import SignUp from './signup/signup.components';
import TimeRecord from './time-record/time-record.components';
import Report from './report/report.components';

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SignIn },
    { path: 'signup', component: SignUp },
    { path: 'time-record', component: TimeRecord },
    { path: 'report', component: Report }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(routes);