import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newForm: FormGroup;
  edit: boolean;
  id: string;
  constructor(
    private _fb: FormBuilder,
    private _appService: AppService,
    private _snackBar: MatSnackBar
  ) {
    this.newForm = this._buildForm();
  }

  private _buildForm(data?: any): FormGroup {
    const campos  = {
      firstName: data && data.firstName || null,
      lastName: data && data.lastName || null,
      age: data && data.age || null,
      email: data && data.email || null
    };
    return this._fb.group(campos);
  }

  ngOnInit(): void {
    this._appService.user$.subscribe((user: any) => {
      this.edit = true;
      this.id = user._id;
      this.newForm = this._buildForm(user);
    });
  }

  submit(): void {
    this._appService.add(this.newForm.value).subscribe(res => {
      this._snackBar.open(res.message, null, {duration: 5000});
      this.newForm.reset();
      this._appService.users$.next();
    }, err => {
      console.log(err);
    });
  }

  editUser(): void {
    this._appService.edit(this.id, this.newForm.value).subscribe(res => {
      this.edit = false;
      this.id = null;
      this._snackBar.open(res.message, null, {duration: 5000});
      this.newForm.reset();
      this._appService.users$.next();
    }, err => {
      console.log(err);
    });
  }

  clear(): void {
    this.newForm.reset();
    this.edit = false;
    this.id = null;
  }

}
