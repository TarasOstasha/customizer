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
  adminPanelColorForm: FormGroup;
  adminPanelMaterialForm: FormGroup;
  adminPanelFinishTypeForm: FormGroup;
  adminPanelDisplays: FormGroup;


  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.adminPanelColorForm = new FormGroup({
      color: new FormControl()
    });

    this.adminPanelMaterialForm = new FormGroup({
      material: new FormControl()
    });

    this.adminPanelFinishTypeForm = new FormGroup({
      type: new FormControl()
    });

    this.adminPanelDisplays = new FormGroup({
      width: new FormControl(),
      height: new FormControl(),
      price: new FormControl
    });
  }

  saveColor() {
    //console.log('Saved : ' + JSON.stringify(this.adminPanelForm.value));
    //console.log(this.adminPanelForm.get('color').touched);
    this.adminPanelColorForm.markAllAsTouched(); // this fixed mat error issue (if you delete that the mat error tag will not be showing)
    const adminData = {
      color: this.adminPanelColorForm.value.color,
    };
    const postSendData = this._http.post(this.url + 'admin-data/color-one-sided', JSON.stringify(adminData), httpOptions).toPromise();
    this.adminPanelColorForm.reset();
  }
  saveMaterial() {
    const adminData = {
      material: this.adminPanelMaterialForm.value.material,
      type: this.adminPanelMaterialForm.value.type
    };
    const postSendData = this._http.post(this.url + 'admin-data/material', JSON.stringify(adminData), httpOptions).toPromise();
    this.adminPanelColorForm.reset();
  }

  saveFinishType() {
    const adminData = {
      color: this.adminPanelColorForm.value.color,
      material: this.adminPanelFinishTypeForm.value.material,
      type: this.adminPanelFinishTypeForm.value.type
    };
    const postSendData = this._http.post(this.url + 'admin-data/type', JSON.stringify(adminData), httpOptions).toPromise();
    this.adminPanelColorForm.reset();
  }

  saveDisplays() {
    const adminData = {
      width: this.adminPanelDisplays.value.width,
      height: this.adminPanelDisplays.value.height,
      price: this.adminPanelDisplays.value.price
    };
    const postSendData = this._http.post(this.url + 'admin-data/product-dimensions', JSON.stringify(adminData), httpOptions).toPromise();
    console.log(adminData)
    //this.adminPanelDisplays.reset();
  }


}
