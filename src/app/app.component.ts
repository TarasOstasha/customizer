import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'custom XYZ';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._authService.autoAuthUser();
  }
}
