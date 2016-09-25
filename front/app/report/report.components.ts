import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import ApiService from '../api/api.service';

@Component({
    selector: 'report',
    templateUrl: 'app/report/report.html'
})
export default class Report {
    formData: any = {};
    items: any;

    constructor(public router: Router,
                public http: Http,
                private apiService: ApiService) {

        this.apiService.request(`/user/time-records`, `GET`).then(data => {

            this.items = data;

        }).catch(error => {
            alert(error);
        });
    }

    onSubmit() {

        let params: any = [];

        if (this.formData.dateFrom) params.push(`dateFrom=${this.formData.dateFrom}`);
        if (this.formData.dateTo) params.push(`dateTo=${this.formData.dateTo}`);

        this.apiService.request(`/user/time-records/filter?${params.join('&')}`, `GET`).then(data => {

            this.items = data;

        }).catch(error => {
            alert(error);
        });
    }

    remove(id: string) {

        this.apiService.request(`/user/time-records/remove/${id}`, `DELETE`).then(() => {

            this.items = this.items.filter((item: any) => {

                return item._id !== id;
            });

        }).catch(error => {
            alert(error);
        });
    }
}