import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';

@Injectable()
export default class ApiService {

    private apiEndpoint = `http://localhost:8000`;

    constructor(private http: Http) {

    }

    request(path: string, method: string, data?: any) {

        return new Promise((resolve, reject) => {

            let headers = new Headers({
                'Authentication': localStorage.getItem('auth_token')
            });

            let contentHeaders = new RequestOptions({headers: headers});

            if (method.toLowerCase() === 'post') {

                this.postRequest(path, data, contentHeaders).subscribe(
                    response => {
                        resolve(response.json());
                    },
                    error => {
                        this.handleError(error);
                        reject(error);
                    }
                );

            } else if (method.toLowerCase() === 'get') {

                this.getRequest(path, contentHeaders).subscribe(
                    response => {
                        resolve(response.json());
                    },
                    error => {
                        this.handleError(error);
                        reject(error);
                    }
                );

            } else {

                this.deleteRequest(path, contentHeaders).subscribe(
                    response => {
                        resolve(response.json());
                    },
                    error => {
                        this.handleError(error);
                        reject(error);
                    }
                );
            }
        });
    }

    private getRequest(path: string, contentHeaders: any) {

        return this.http.get(`${this.apiEndpoint}${path}`, contentHeaders);
    }

    private postRequest(path: string, data: any, contentHeaders: any) {

        return this.http.post(`${this.apiEndpoint}${path}`, data, contentHeaders);
    }

    private deleteRequest(path: string, contentHeaders: any) {

        return this.http.delete(`${this.apiEndpoint}${path}`, contentHeaders);
    }

    private handleError(error: Error) {

        console.log(error);
    }
}