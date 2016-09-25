import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routes';
import SignIn from './signin/signin.components';
import SignUp from './signup/signup.components';
import ApiService from './api/api.service';
import UserService from './user/user.service';
import TimeRecord from './time-record/time-record.components';
import Report from './report/report.components';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        SignIn,
        SignUp,
        TimeRecord,
        Report
    ],
    providers: [
        appRoutingProviders,
        UserService,
        ApiService
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(<any>AppModule);