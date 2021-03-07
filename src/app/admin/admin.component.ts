import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminPageService } from '../services/admin-page.service';

import { mimeType } from './mime-type.validator';

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


  constructor(private _http: HttpClient, private _admin: AdminPageService) { }

  ngOnInit(): void {
   
    this.adminPanelProduct = new FormGroup({
      size: new FormControl(),
      group: new FormControl(),
      classification: new FormControl(),
      pattern: new FormControl(),
      variety: new FormControl(),
      model: new FormControl(),
      price: new FormControl(),
      //image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }
  //
  async saveProduct() {
    
    // one method //
    // const postData: any = new FormData();
    // postData.append('size', this.adminPanelProduct.value.size);
    // postData.append('group', this.adminPanelProduct.value.group);
    // postData.append('classification', this.adminPanelProduct.value.classification);
    // postData.append('pattern', this.adminPanelProduct.value.pattern);
    // postData.append('variety', this.adminPanelProduct.value.variety);
    // postData.append('model', this.adminPanelProduct.value.model);
    // postData.append('price', this.adminPanelProduct.value.price);
    // postData.append('image', this.adminPanelProduct.value.image);
    
      
    // this._http.post(this.url + 'admin-data/my-prod', postData, httpOptions).subscribe(
    //   (response) => console.log(response),
    //   (erorr) => console.log(erorr)
    // )

    // console.log(postData)
    const adminData = {
      size: this.adminPanelProduct.value.size,
      group: this.adminPanelProduct.value.group,
      classification: this.adminPanelProduct.value.classification,
      pattern: this.adminPanelProduct.value.pattern,
      variety: this.adminPanelProduct.value.variety,
      model: this.adminPanelProduct.value.model,
      price: this.adminPanelProduct.value.price,
      //img: this.adminPanelProduct.value.image
    };
    this._admin.addMyPostAdmin(adminData, this.adminPanelProduct.value.image)
    // console.log(adminData)
    // const postSendData = await this._http.post(this.url + 'admin-data/my-prod', adminData, httpOptions).toPromise();
    // console.log(postSendData)
    //this.adminPanelDisplays.reset();
  }
  
  imagePreview: any;
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.adminPanelProduct.patchValue({ image: file });
    this.adminPanelProduct.get('image').updateValueAndValidity();
    const reader = new FileReader();
    //console.log(reader)
    reader.onload = () => {
      this.imagePreview = reader.result
    };
    reader.readAsDataURL(file);
  }







}
