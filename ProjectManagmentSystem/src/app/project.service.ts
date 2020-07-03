import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private SERVER_URL = "http://localhost:9000/pms/Project/";

  constructor(private httpClient: HttpClient) { }

  addProject(project:Project): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(project);
    console.log(body)
    return this.httpClient.post(this.SERVER_URL + 'createProject', body,{'headers':headers})
  }

  listProjects():Observable<any> {    
    return this.httpClient.get(this.SERVER_URL + 'listProjects')
  }

  deleteProject(project:Project): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.httpClient.delete(this.SERVER_URL + 'deleteProject/'+project.projectId, {'headers':headers})
  }

  updateProject(project:Project): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(project);
    console.log(body)
    return this.httpClient.post(this.SERVER_URL + 'updateProjects', body,{'headers':headers})
  }
}
