import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  private url = 'http://localhost:3000/api/';
  adminPanelForm: FormGroup;


  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.adminPanelForm = new FormGroup({
      color: new FormControl(),
      material: new FormControl(),
      type: new FormControl()
    });
  }

  save() {
    console.log(this.adminPanelForm);
    console.log('Saved : ' + JSON.stringify(this.adminPanelForm.value));
    console.log(this.adminPanelForm.get('color').touched);
    this.adminPanelForm.markAllAsTouched(); // this fixed mat error issue (if you delete that the mat error tag will not be showing)
    const adminData = {
      color: this.adminPanelForm.value.color,
      material: this.adminPanelForm.value.material,
      type: this.adminPanelForm.value.type
    };
    const postSendData = this._http.post(this.url + 'admin-data', JSON.stringify(adminData), httpOptions).toPromise();
    this.adminPanelForm.reset();
  }

}
