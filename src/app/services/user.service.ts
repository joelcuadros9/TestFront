import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";

const baseURL = environment.API_URL + '/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUsers(){
    return this.httpClient.get(baseURL);
  }

  addUser(body: any){
    return this.httpClient.post(baseURL, body);
  }

  updateUser(body: any) {
    return this.httpClient.put(baseURL, body);
  }

  deleteUser(id: number){
    return this.httpClient.delete(baseURL + '/' + id)
  }

}
