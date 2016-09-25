import {Component} from '@angular/core';
import UserService from './user/user.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: 'app/app.html'
})

export class AppComponent {

    constructor(public userService: UserService,
                public router: Router) {
    }

    logOut() {

        this.userService.logout();
        this.router.navigate(['/signin']);
    }
}