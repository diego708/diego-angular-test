import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  editTaskForm: taskForm = new taskForm();

  @ViewChild("taskForm")
  taskForm!: NgForm;

  isSubmitted: boolean = false;
  taskId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['taskId'];
    this.getTaskDetailById();
  }

  getTaskDetailById() {
    this.httpProvider.getTaskDetailById(this.taskId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editTaskForm.Id = resultData.id;
          this.editTaskForm.Title = resultData.Title;
          this.editTaskForm.Description = resultData.Description;
          this.editTaskForm.CreationDate = resultData.CreationDate;
          this.editTaskForm.ConclusionDate = resultData.ConclusionDate;
          this.editTaskForm.Responsible = resultData.Responsible;
          this.editTaskForm.Status = resultData.Status;
        }
      }
    },
      (error: any) => { });
  }

  EditTask(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveTask(this.editTaskForm).subscribe(async data => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            if (resultData != null && resultData.isSuccess) {
              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);
            }
          }
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class taskForm {
  Id: number = 0;
  Title: string = "";
  Description: string = "";
  CreationDate: string = "";
  ConclusionDate: string = "";
  Responsible: string = "";
  Status: string = "";
}
