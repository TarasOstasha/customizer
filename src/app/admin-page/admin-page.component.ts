import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mimeType } from './mime-type.validator';


import { AuthService } from '../services/auth.service.service';


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

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      size: new FormControl(null, { validators: [Validators.minLength(3)] }),
      group: new FormControl(null, { validators: [Validators.minLength(3)] }),
      classification: new FormControl(null, { validators: [Validators.minLength(3)] }),
      pattern: new FormControl(null, { validators: [Validators.minLength(3)] }),
      variety: new FormControl(null, { validators: [Validators.minLength(3)] }),
      model: new FormControl(null, { validators: [Validators.minLength(3)] }),
      price: new FormControl(null, { validators: [Validators.minLength(3)] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
   
    // this._http.post('http://localhost:3000/api/admin-product-data', postData).subscribe(result => {
    //   console.log(result);
    // });
    //const fromServer: any = await this._http.post('http://localhost:3000/api/admin-product-data', postData, httpOptions).toPromise();
    //console.log(fromServer);
    this._auth.addPostAdmin(this.form.value.size, this.form.value.group, this.form.value.classification, this.form.value.pattern, this.form.value.variety, this.form.value.model, this.form.value.price, this.form.value.image);
  }

  
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    //console.log(reader)
    reader.onload = () => {
      this.imagePreview = reader.result
    };
    reader.readAsDataURL(file);
  }

}
