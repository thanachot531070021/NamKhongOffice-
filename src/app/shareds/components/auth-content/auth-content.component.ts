import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
declare const App;

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    App.initalLoadPage();
  }

}
