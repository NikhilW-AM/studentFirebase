import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { exprience } from '../Interfaces/exprience';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _httpService: HttpService
  ) {}
  addCandidateForm!: FormGroup;
  skillsArray: string[] = [
    'Angular',
    'React',
    'Node.JS',
    'JavaScript',
    'Flutter',
    'java',
  ];
  optionArray: exprience[] = [
    { companyName: '', Duration: '', responsibilities: '' },
    { companyName: '', Duration: '', responsibilities: '' },
  ];

  ngOnInit(): void {
    //Creating form
    this.addCandidateForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.required],
      skills: this._fb.array(
        [],
        [Validators.required, Validators.minLength(3)]
      ),
      exprience: this._fb.array(
        this.optionArray.map((contact: any) => this.createContact(contact))
      ),
    });
  }
  createContact(contact: exprience): FormGroup {
    return this._fb.group({
      companyName: [contact.companyName, Validators.required],
      Duration: [contact.Duration, Validators.required],
      responsibilities: [contact.responsibilities, Validators.required],
    });
  }

  quantities(): FormArray {
    return this.addCandidateForm.get('exprience') as FormArray;
  }

  newQuantity(): FormGroup {
    return this._fb.group({
      companyName: ['', Validators.required],
      Duration: ['', Validators.required],
      responsibilities: ['', Validators.required],
    });
  }

  addQuantity() {
    if (this.quantities().length < 5)
      this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    if (this.quantities().length > 2) {
      this.quantities().removeAt(i);
    }
  }

  selectSkill(e: any) {
    const formArray = this.addCandidateForm.get('skills') as FormArray;
    if (!e.target.checked) {
      var i = formArray.controls.findIndex((x) => x === e.target.value);
      formArray.removeAt(i);
    } else {
      formArray.push(new FormControl(e.target.value));
    }
  }

  submit() {
    console.log(this.addCandidateForm.value);
    this._httpService.createStudent(this.addCandidateForm.value);
    this._router.navigate(['list']);
  }
}
