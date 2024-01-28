import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      bio: ['']
    });
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      console.log(this.settingsForm.value);
      // Call your API to update the user settings
    }
  }
}
