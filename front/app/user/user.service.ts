import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {contentHeaders} from '../common/headers';

@Injectable()
export default class UserService {
    private loggedIn = false;

    constructor(private http: Http) {
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    /**
     * Obtain user token
     *
     * @param loginData
     * @param loginData.login
     * @param loginData.password
     * @returns {Promise<T>}
     */
    login(loginData: any) {

        return new Promise((resolve, reject) => {

            this.http.post('http://176.112.196.27:8000/login', loginData, contentHeaders)
                .subscribe(
                    response => {

                        let res = response.json();

                        localStorage.setItem('auth_token', res.token);
                        this.loggedIn = true;

                        resolve();
                    },
                    error => {
                        alert(error.text());
                        console.log(error.text());
                        reject(error);
                    });
        });
    }

    /**
     * Obtain a user
     *
     * @param signUpData
     * @param signUpData.login
     * @param signUpData.password
     * @returns {Promise<T>}
     */
    signUp(signUpData: any) {

        return new Promise((resolve, reject) => {

            this.http.post('http://176.112.196.27:8000/register', signUpData, contentHeaders)
                .subscribe(
                    response => {

                        resolve();
                    },
                    error => {
                        alert(error.text());
                        console.log(error.text());
                        reject(error);
                    });
        });
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}