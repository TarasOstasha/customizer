import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mimeType } from './mime-type.validator';


import { AdminPageService } from '../services/admin-page.service';
import { MainProduct } from '../models/product-data.model';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.less']
})
export class AdminPageComponent implements OnInit {
  isLoading = false;
  imagePreview: any;
  form: FormGroup;
  
  
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  private url = 'http://localhost:3000/api/';

  constructor(private _http: HttpClient, private _admin: AdminPageService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      size: new FormControl(null, { validators: [Validators.minLength(3)] }),
      group: new FormControl(null, { validators: [Validators.minLength(3)] }),
      classification: new FormControl(null, { validators: [Validators.minLength(3)] }),
      pattern: new FormControl(null, { validators: [Validators.minLength(3)] }),
      variety: new FormControl(null, { validators: [Validators.minLength(3)] }),
      model: new FormControl(null, { validators: [Validators.minLength(3)] }),
      price: new FormControl(null, { validators: [Validators.minLength(3)] }),
      //image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    console.log();
  }
  userAdminData: MainProduct;
  onSubmit() {
    //console.log(this.form.value, 'admin panel');
    if(this.form.invalid) {
      return;
    }
    
      return this._http.post<MainProduct>(this.url + 'admin-product-data', this.form.value, httpOptions).toPromise();
    
  

    //this.userAdminData = this.form.value;
    //this._admin.addPostAdmin(this.userAdminData);
   
    // this._http.post('http://localhost:3000/api/admin-product-data', postData).subscribe(result => {
    //   console.log(result);
    // });
    //const fromServer: any = await this._http.post('http://localhost:3000/api/admin-product-data', postData, httpOptions).toPromise();
    //console.log(fromServer);
    // this._admin.addPostAdmin(
    //   this.form.value.size, 
    //   this.form.value.group, 
    //   this.form.value.classification, 
    //   this.form.value.pattern, 
    //   this.form.value.variety, 
    //   this.form.value.model, 
    //   this.form.value.price, 
    //   //this.form.value.image
    // );
  }

  getPosts() {
    return this._http.get<MainProduct>(this.url + 'admin-product-data').toPromise();
  }
  
  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({ image: file });
  //   this.form.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   //console.log(reader)
  //   reader.onload = () => {
  //     this.imagePreview = reader.result
  //   };
  //   reader.readAsDataURL(file);
  // }

  async getItem() {
    console.log('get item')
    //const data = await this._admin.getPosts();
    const data = await this.getPosts();
    console.log(data)
  }

}
