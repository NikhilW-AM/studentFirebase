import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  id:any
  studentObj: any;
  editForm!: FormGroup;
  skillsArray: string[] = [
    'Angular',
    'React',
    'Node.JS',
    'JavaScript',
    'Flutter',
    'java',
  ];
  constructor(
    private _http: HttpService,
    private route: ActivatedRoute,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this._http.getStudentDoc(this.id).subscribe((student) => {
      this.studentObj = student;
      console.log(this.studentObj);
      if (this.studentObj) this.setValue();
    });
  }
  quantities(): FormArray {
    return this.editForm.get('exprience') as FormArray;
  }
  removeQuantity(i: number) {}
  addQuantity(): FormGroup {
    return this._fb.group({
      Duration: [''],
      responsibilities: [''],
      companyName: [''],
    });
  }
  setValue() {
    console.log(this.studentObj);
    let {
      firstname,
      lastname,
      email,
      gender,
      pin,
      exprience,
      skills,
      state,
      country,
      address,
    } = this.studentObj;
    console.log();
    // this.editForm.setValue({
    //   firstname,
    //   lastname,
    //   email,
    //   address,
    //   gender,
    //   pin,
    //   state,
    //   country,
    //   exprience: [...exprience],
    //   skills: [...skills],
    // });

    this.editForm = this._fb.group({
      firstname: firstname,
      lastname: lastname,
      email: email,
      gender: gender,
      pin: pin,
      exprience: this._fb.array([
        ...exprience.map((exp: any) => this._fb.group(exp)),
      ]),
      skills: this._fb.array([...skills.map((s: any) => new FormControl(s))]),
      state: state,
      country: country,
      address: address,
    });
  }
  selectSkill(e: any) {
    const formArray = this.editForm.get('skills') as FormArray;
    if (!e.target.checked) {
      var i = formArray.controls.findIndex((x) => x === e.target.value);
      formArray.removeAt(i);
    } else {
      formArray.push(new FormControl(e.target.value));
    }
  }
  submit() {
    console.log(this.editForm.value);
    this._http.updateStudent(this.editForm.value,this.id);
  }
}
