// home.component.ts
import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    gsap.from('.fade-in-up', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'easeInOut'
    });

  }
}
