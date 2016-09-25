import { Headers, RequestOptions } from '@angular/http';

let headers = new Headers({ 'Content-Type': 'application/json' });
export const contentHeaders = new RequestOptions({ headers: headers });