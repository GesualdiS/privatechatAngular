import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-after-google-login',
  templateUrl: './after-google-login.component.html',
  styleUrls: ['./after-google-login.component.css']
})
export class AfterGoogleLoginComponent implements OnInit{
  constructor(private user: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.user.getUsernameAndEmail().subscribe((data) => {
      if(data){
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("accessTokenDeath", String(Date.now() + 1800000));
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        this.router.navigate(['/home/afterLogin']);
        this.auth.loginError = false
      }else{
        this.auth.loginError = true
        this.router.navigate(['/loginError'])
      }

    })
  }



}
