import { DBOperations } from './_helpers/db-operations';
import { User } from './_helpers/user.interface';
import { UserService } from './_helpers/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'form-table';
  // registerForm: FormGroup = new FormGroup({});

  registerForm: FormGroup;
  users: User[] = [];

  buttonText: string = 'Submit';
  dbOps: number = DBOperations.created;
  submitted: boolean = false;

  constructor(
    private _toastr: ToastrService,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {}
  ngOnInit() {
    this.setFormState();
    this.getAllUsers();
  }

  setFormState() {
    this.registerForm = this._fb.group(
      {
        id: [0],
        title: ['', Validators.required],
        firstName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ]),
        ],
        lastName: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ]),
        ],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        dob: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
            ),
          ]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    }
    switch (this.dbOps) {
      case DBOperations.created:
        this._userService.addUser(this.registerForm.value).subscribe((res) => {
          this._toastr.success('User Added!!', 'User Registration');
          this.getAllUsers();
          this.onCancel();
        });
        break;
      case DBOperations.updated:
        this._userService
          .updateUser(this.registerForm.value)
          .subscribe((res) => {
            this._toastr.success('User Updated!!', 'User Registration');
            this.getAllUsers();
            this.onCancel();
          });

        break;
    }
  }

  onCancel() {
    this.registerForm.reset();
    this.buttonText = 'Submit';
    this.dbOps = DBOperations.created;
    this.submitted = false;
  }

  getAllUsers() {
    this._userService.getUsers().subscribe((res: User[]) => {
      //(res: User[]) we wrote this b/c it was giving an error of type so we have to convert res to (res: User[]) to array.users was array but only res is an object so, we have to convert it to array
      this.users = res;
      console.log(res);
    });
  }

  Edit(userId: number) {
    this.buttonText = 'Update';
    this.dbOps = DBOperations.updated;

    let user = this.users.find((item: User) => item.id === userId);

    console.log(user, 'userrrsdata');

    this.registerForm.patchValue({
      ...user,
      acceptTerms: false,
      password: '',
      confirmPassword: '',
    });

    // this.registerForm.get('password').setValue('');
    // this.registerForm.get('confirmPassword').setValue('');
    // this.registerForm.get('acceptTerms').setValue(false);
  }

  Delete(userId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes,delete it!',
      cancelButtonText: 'No,keep it',
    }).then((result) => {
      if (result.value) {
        this._userService.deleteUser(userId).subscribe((res) => {
          this.getAllUsers();
          this._toastr.success('Deleted Successfully!!', 'User Registration');
          // Swal.fire('Deleted!', 'Your record has been deleted', 'success');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your record is safe :)', 'error');
      } else {
      }
    });
  }
}
