import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import ApiService from '../api/api.service';

@Component({
    selector: 'time-record',
    templateUrl: 'app/time-record/time-record.html'
})
export default class TimeRecord {
    formData: any = {};

    constructor(public router: Router,
                public http: Http,
                private apiService: ApiService) {
    }

    onSubmit() {

        this.apiService.request(`/user/time-records/create`, `POST`, this.formData).then(data => {

            this.router.navigate(['/report']);

        }).catch(error => {
            alert(error);
        });
    }
}