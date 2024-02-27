import { Component, inject, TemplateRef } from '@angular/core';
import {NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  private offcanvasService = inject(NgbOffcanvas);
  constructor(public auth: AuthService){}
  openBottom(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'bottom' });
	}
}
