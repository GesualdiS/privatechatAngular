import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder, private user: UserService) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      username: ['', ],
      email: ['', [Validators.email]],
      password: [''],
      gender: [''],
      bio: [''],
      profilePicture: ['']
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.settingsForm.patchValue({
        profilePicture: file
      });
    }
  }

  triggerSelectFile(fileInput: HTMLInputElement) {
    fileInput.click()
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      const username = this.settingsForm.get('username')?.value;
      if (username) {
        this.user.changeUsername(username).subscribe((res) => {
          console.log(res);
        })
      }
      const email = this.settingsForm.get('email')?.value;
      if (email) {
        //We are changing the email
      }
      const password = this.settingsForm.get('password')?.value;
      if (password) {
        //We are changing the password
      }
      const gender = this.settingsForm.get('gender')?.value;
      if (gender) {
        //We are changing the gender
      }
      const bio = this.settingsForm.get('bio')?.value;
      if (bio) {
        //We are changing the bio
      }

      const profilePicture = this.settingsForm.get('profilePicture')?.value;
      if (profilePicture) {
        this.user.changeProfilePicture(profilePicture).subscribe((res) => {
          console.log(res);
        })
      }
    }
  }
}
