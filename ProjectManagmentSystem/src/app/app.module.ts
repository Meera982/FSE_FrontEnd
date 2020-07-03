import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { ProjectModalComponent } from './modals/project-modal/project-modal.component';
import { TaskModalComponent } from './modals/task-modal/task-modal.component';
import { UpdateTaskWindowComponent } from './update-task-window/update-task-window.component';




@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    AddUserComponent,
    AddProjectComponent,
    HeaderComponent,
    FilterPipe,
    UserModalComponent,
    ProjectModalComponent,
    TaskModalComponent,
    UpdateTaskWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    Ng5SliderModule,
    NgbModule    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [ UpdateTaskWindowComponent]
})
export class AppModule { }
