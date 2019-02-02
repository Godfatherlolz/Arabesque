import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base : string = 'https://s3.eu-west-2.amazonaws.com/sample-sray-logs-coding-interview/sray-logs.json';

constructor(private http:HttpClient) {
}

load() {
return this.http.get(this.base);
}

}
