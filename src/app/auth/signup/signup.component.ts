import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit, OnDestroy {
  
  isLoading = false;
  private authStatusSub: Subscription;
  public name: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  onSingUp(form: NgForm) {
    if(form.invalid) {
      return
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
    this.name = this.authService.emailName;
    //console.log(form.value);
  }

}
