import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private SERVER_URL = "http://localhost:9000/pms/Task/";

  constructor(private httpClient: HttpClient) { }

  addTask(task:Task): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(task);
    console.log(body)
    return this.httpClient.post(this.SERVER_URL + 'createTask', body,{'headers':headers})
  }

  listParentTask():Observable<any> {    
    return this.httpClient.get(this.SERVER_URL + 'listParentTasks')
  }

  endTask(task:Task): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.get(this.SERVER_URL + 'endTask/'+task.taskId, {'headers':headers})
  }

  updateTask(task:Task): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(task);
    console.log(body)
    return this.httpClient.post(this.SERVER_URL + 'updateTask', body,{'headers':headers})
  }
}
