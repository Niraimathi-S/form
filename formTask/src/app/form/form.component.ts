import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormService } from '../formService.service';
import { user } from '../model';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  genders: String[] = [
    'Male',
    'Female',
    'Transgender',
    'Does not wish to disclose',
  ];

  nameFields = [
    {
      label: 'First Name',
      controlName: 'firstName',
      message: 'First name is required',
    },
    {
      label: 'Last Name',
      controlName: 'lastName',
      message: 'Last name is required',
    },
  ];

  public fields = [
    {
      label: 'Email',
      controlName: 'email',
      errorConditions: [
        {
          condition: 'required',
          message: 'Email Id is required',
        },
        {
          condition: 'email',
          message:
            'Email ID must contain @ followed by domain name(e.g example@mail.com)',
        },
      ],
    },
    {
      label: 'Mobile Number',
      controlName: 'contactNumber',
      errorConditions: [
        {
          condition: 'required',
          message: 'Mobile Number is required',
        },
        {
          condition: 'pattern',
          message:
            'Invalid Mobile number. Mobile number must be 10 digit number.',
        },
      ],
    },

    {
      label: 'Password',
      controlName: 'password',
      errorConditions: [
        {
          condition: 'required',
          message: 'Password is required',
        },
        {
          condition: 'minlength',
          message: 'Password must contain atleast 8 characters',
        },
      ],
    },
  ];

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    gender: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    contactNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
  });

  constructor(private formService: FormService) {}
  onSubmit(form: any) {
    if (this.userForm.valid) {
      this.formService.addUser(this.userForm.value);
      alert('User Details submitted successfully!');
    }
  }

  reset() {
    this.userForm.reset();
  }

  ngOnInit(): void {}
}
