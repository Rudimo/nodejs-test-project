import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import UserService from '../user/user.service';

interface FormDataInterface {
    login?: string;
    password?: string;
}

@Component({
    selector: 'signup',
    templateUrl: 'app/signin/signin.html',
    styleUrls: ['app/signin/signin.css']
})
export default class SignIn {
    formData: FormDataInterface = {};

    constructor(public router: Router,
                public http: Http,
                private userService: UserService) {
    }

    onSubmit() {

        this.userService.login(this.formData).then(() => {

            this.router.navigate(['/time-record']);

        }).catch((error: Error) => {

            alert(error);
            console.log(error);
        });
    }
}