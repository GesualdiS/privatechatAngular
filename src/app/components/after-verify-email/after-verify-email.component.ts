import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface VerifyResponse {
  result: string,
  accessToken: string,
  refreshToken: string
}
@Component({
  selector: 'app-after-verify-email',
  templateUrl: './after-verify-email.component.html',
  styleUrls: ['./after-verify-email.component.css']
})
export class AfterVerifyEmailComponent {
  user = localStorage.getItem('username')
  public text!: String
  private response! : VerifyResponse

  constructor (private router: Router, private route: ActivatedRoute, private auth: AuthService, private _snackBar: MatSnackBar){

  }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const token = params['token'];
      if (token) {
        this.response = await this.auth.verifyEmail(token)
        if(this.response.result === "User verified"){
          console.log('Email verified:', this.response);
          this._snackBar.open("Congratulations! Your email has been verified.", 'Close');
          localStorage.setItem("accessToken", this.response.accessToken)
          localStorage.setItem("refreshToken", this.response.refreshToken)
        }else{
          console.log('Email not verified:', this.response);
          this._snackBar.open("Uh-oh! Looks like there was an issue verifying your email. Gremlins, perhaps?", 'Close');
        }
      }else{
        this._snackBar.open("You are sure you clicked on the right link? Maybe we did something wrong.", 'Close');
      }
    });
  }
}
