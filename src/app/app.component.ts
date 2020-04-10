import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reactive-forms';
  genders = ['Male', 'Female'];
  signupForm: FormGroup;
  inValidUserNames = ['Madhu', 'Test'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.validUserName.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email], [this.validEmail]),
      'gender': new FormControl('Male', [Validators.required]),
      'hobbies': new FormArray([])
    });

    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    (<FormArray>this.signupForm.get("hobbies")).push(new FormControl(null, Validators.required));
  }

  getHobbyControls() {
    return (<FormArray>this.signupForm.get("hobbies")).controls;
  }

  validUserName(control: FormControl): { [s: string]: boolean } {
    if (this.inValidUserNames.indexOf(control.value) !== -1) {
      return { 'invalidUser': true };
    }
  }

  validEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "a@b.com") {
            resolve({ invalidEmail: true })
          } else {
            resolve(null);
          }
        }, 1000)
      }
    );
    return promise;
  }

}
