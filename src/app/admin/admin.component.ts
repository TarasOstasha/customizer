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
  //private url = 'http://localhost:3000/api/';
  private url = 'http://localhost:3000/api/';

  adminPanelProduct: FormGroup;


  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
   
    this.adminPanelProduct = new FormGroup({
      size: new FormControl(),
      group: new FormControl(),
      classification: new FormControl(),
      pattern: new FormControl(),
      variety: new FormControl(),
      model: new FormControl(),
      price: new FormControl()
    });
  }
  //
  async saveProduct() {
    const adminData = {
      size: this.adminPanelProduct.value.size,
      group: this.adminPanelProduct.value.group,
      classification: this.adminPanelProduct.value.classification,
      pattern: this.adminPanelProduct.value.pattern,
      variety: this.adminPanelProduct.value.variety,
      model: this.adminPanelProduct.value.model,
      price: this.adminPanelProduct.value.price
    };
    console.log(adminData)
    const postSendData = await this._http.post(this.url + 'admin-data/my-prod', JSON.stringify(adminData), httpOptions).toPromise();
    console.log(postSendData)
    //this.adminPanelDisplays.reset();
  }
  









}
