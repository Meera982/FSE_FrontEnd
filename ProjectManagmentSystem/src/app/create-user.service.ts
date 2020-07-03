import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})

export class CreateUserService {

  private SERVER_URL = "http://localhost:9000/pms/User/";

  constructor(private httpClient: HttpClient) { }

  addUser(user:User): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    console.log(body)
    return this.httpClient.post(this.SERVER_URL + 'createUser', body,{'headers':headers})
  }

  listUsers():Observable<any> {    
    return this.httpClient.get(this.SERVER_URL + 'listUsers')
  }

  deleteUser(user:User): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.delete(this.SERVER_URL + 'deleteUser/'+user.userId, {'headers':headers})
  }

  updateUser(user:User): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(user);
    console.log(body)
    return this.httpClient.post(this.SERVER_URL + 'updateUser', body,{'headers':headers})
  }
}
