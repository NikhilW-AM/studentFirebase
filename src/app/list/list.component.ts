import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  studentArray: any[] = [];
  constructor(private _http: HttpService, private _router: Router) {}

  ngOnInit(): void {
    this._http.getStudentList().subscribe((res: any) => {
      (this.studentArray = res.map((snap: any) => {
        return {
          id: snap.payload.doc.id,
          ...(snap.payload.doc.data() as {}),
        };
      })),
        console.log(this.studentArray);
    });
  }
  totalExperience(exprience: any) {
    return exprience
      .map((item: any) => parseInt(item.Duration))
      .reduce((prev: number, next: number) => prev + next);
  }
  editDetails(student: any) {
    this._router.navigate(['/edit', student.id]);
  }
  deleteDetails(student: any) {
    this._http.deleteStudent(student.id);
  }
}
