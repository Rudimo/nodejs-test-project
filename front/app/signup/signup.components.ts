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
    templateUrl: 'app/signup/signup.html',
    styleUrls: ['app/signup/signup.css']
})
export default class SignUp {
    formData: FormDataInterface = {};

    constructor(public router: Router,
                public http: Http,
                private userService: UserService) {
    }

    onSubmit() {

        this.userService.signUp(this.formData).then(() => {

            this.router.navigate(['/signin']);

        }).catch((error: Error) => {

            alert(error);
            console.log(error);
        });
    }
}