import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PassServiceService {

  /*constructor(private http: HttpClient) { }
  //creating  intsnace for http clien
  getData(){//method for httpclient to get data for API
    return this.http.get('/saveDetails');
}*/



  domain = 'http://localhost:2000' //node port
  constructor(
    private http: HttpClient, //imported for global
  ) { }
  async saveDetails(param1: any) {//angular form values passed into services with http module
    console.log('inside service');
    return this.http.post<any>(this.domain + '/saveDetails', param1).toPromise();
  }
  async updateDetails(param2:any){
    console.log("inside service");
    return this.http.post<any>(this.domain + '/updateDetails',param2).toPromise();
  }
  async delDetails(param3:any){
    console.log("inside service");
    return this.http.post<any>(this.domain + '/delDetails',param3).toPromise();
  }
}

