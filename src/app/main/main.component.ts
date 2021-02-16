import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

// models
import { Size } from '../models/size';
import { Select } from '../models/select';
import { Title } from '@angular/platform-browser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  // material selected value
  blankSelectedValue: string;
  fullColorOneSideSelectedValue: string;
  fullColorTwoSideSelectedValue: string;

  // expand first row
  step = 0;
  // disabled flags
  isDisabledType: boolean = true;
  isDisabledDimensions: boolean = true;
  isDisabledMaterial: boolean = true;
  // form group
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  clientForm: FormGroup;

  // flags to change select state
  blankColorFlag: boolean = true;
  fullColor: boolean;
  materialFlag: boolean;
  oneSidedMaterialFlag: boolean;
  twoSidedMaterialFlag: boolean;

  // img flags
  blankImg: boolean;
  colorImg: boolean;


  addressFlag: boolean;
  nextBtnFlag: boolean = true;
  //sendRequestBtn: boolean = true;

  //enteredWidthFt: number;
  // enteredWidthIn: number;
  // enteredHeightFt: number;
  // enteredHeightIn: number;
  // enteredBlankProdMaterial: string;
  // enteredFullColorOneSideMaterial: string;
  // enteredFullColorTwoSideMaterial: string;
  // enteredProdType: string;

  sizeData: Size[] = [];

  finishType: Select[] = [];
  materials: Select[] = [];
  oneSidedMaterial: Select[] = [];
  twoSidedMaterial: Select[] = [];
  private url = 'http://localhost:3000/api/';

  async getFinishType() {
    // this._http.get('http://localhost:3000/api/posts')
    //   .subscribe((response: any)=> {
    //     console.log(response.posts)
    //   });
    const data: any = await this._http.get(this.url + 'finish-type').toPromise();
    this.finishType = await data.posts;
    console.log(data)
  }
  async getBlankMaterial() {
    const data: any = await this._http.get(this.url + 'blank-material').toPromise();
    this.materials = await data.posts;
    console.log(data);
  }
  async getFullColorOneSided() {
    const data: any = await this._http.get(this.url + 'color-one-sided').toPromise();
    this.oneSidedMaterial = await data.posts;
    console.log(data);
  }
  async getFullColorTwoSided() {
    const data: any = await this._http.get(this.url + 'color-two-sided').toPromise();
    this.twoSidedMaterial = await data.posts;
    console.log(data);
  }

  ////// dynamically get data from back end
  filteredObj = { width: 0, height: 0, price: 0 };
  
  onChangeSize() {
    try {
      this.clientForm.valueChanges.pipe(debounceTime(300)).subscribe(async (val) => {
        //console.log(val.enteredWidthFt, val.enteredHeightFt);
        if( val.enteredWidthFt && val.enteredHeightFt > 10 || val.enteredWidthFt && val.enteredHeightFt < 2 ) {
          return
        }
        const width = val.enteredWidthFt;
        const height = val.enteredHeightFt;
        //let postData: any = await this._http.post(this.url + 'admin-data/product-dimensions', { width, height }, httpOptions).toPromise();
        //console.log(postData)
        let getPostData: any = await this._http.get(this.url + 'admin-data/get-product-dimensions').toPromise();
        const dimensionsValue = getPostData.data.find(item => {
          return item.width == width && item.height == height;
        })
        this.filteredObj = Object.assign(dimensionsValue);
        //console.log(this.dimensionsValue.width)
        //let getData: any = await this._http.get(this.url + 'product-dimensions').toPromise();
        //this.test = await getData
        //console.log(this.test)
        // let result = getData.data.find(function (e) {
        //   return e.width == val.enteredWidthFt && e.height == val.enteredHeightFt;
        // });
        // this.filteredObj = Object.assign(result);  // made copy of result obj
        // if(this.filteredObj == undefined || this.filteredObj == null) {
        //   return console.log('Cannot convert undefined or null to object');
        // }
        //console.log(this.filteredObj)
      });
    } catch (error) {
      console.error(error);
    }

  }
  // stop submitting form for appropriate buttons
  cancelEvent(event) {
    event.preventDefault();
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this.clientForm = this._formBuilder.group({
      blankMaterialValue: ['', Validators.required],
      fullColorOneSidedValue: [''],
      fullColorTwoSidedValue: [''],
      enteredWidthFt: [ 0, [Validators.required, Validators.max(10), Validators.min(2)] ],
      enteredWidthIn: [0],
      enteredHeightFt: [ 0, [Validators.required, Validators.max(10), Validators.min(2)] ],
      enteredHeightIn: [0],
      enteredProdType: ['', Validators.required],
      userName: ['', Validators.required],
      address: ['', Validators.required]
    });

    // on this method you can subscribe and listen all changes in live
    // this.clientForm.valueChanges.subscribe(val => {
    //   console.log(val);
    // });    
  }
  imagePreview: any;
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    console.log(reader)
    reader.onload = () => {
      this.imagePreview = reader.result
    };
    reader.readAsDataURL(file);
  }

  // selectedMaterial(val) {
  //   console.log('material- ', val)
  //   this.isDisabledDimensions = false;
  //   //this.materialFlag = true;
  //   this.enteredProdMaterial = val;
  // }

  async selectedBlankMaterial() {
    this.isDisabledDimensions = false;
    //this.enteredBlankProdMaterial = this.blankSelectedValue;
    //console.log(this.enteredBlankProdMaterial);
    // this.clientForm.valueChanges.subscribe(val => {
    //   console.log(val);
    // }); 
    this.getFinishType();
  }
  selectedFullColorOneSideMaterial() {
    this.isDisabledDimensions = false;
    //this.enteredFullColorOneSideMaterial = this.fullColorOneSideSelectedValue;
    //console.log(this.enteredFullColorOneSideMaterial);
    this.getFinishType();
  }
  selectedFullColorTwoSideMaterial(event) {
    this.isDisabledDimensions = false;
    //this.enteredFullColorTwoSideMaterial = this.fullColorTwoSideSelectedValue;
    //console.log(this.enteredFullColorTwoSideMaterial);
    this.getFinishType();
    console.log('event')
  }

  selectedType() {
    //this.enteredProdType = val;
    this.nextBtnFlag = false;
  }

  chooseBlank() {
    this.blankColorFlag = true;
    this.isDisabledMaterial = false;
    this.oneSidedMaterialFlag = false;
    this.twoSidedMaterialFlag = false;
    this.fullColor = false;
    // img
    this.blankImg = true;
    this.colorImg = false;
    this.getBlankMaterial();
  }
  chooseFullColor() {
    this.isDisabledMaterial = true;
    this.fullColor = true;
    this.materialFlag = false;
    this.isDisabledType = true;
    this.isDisabledDimensions = true;
    this.isDisabledMaterial = true;
    this.addressFlag = false;
    // img
    this.colorImg = true;
    this.blankImg = false;
    //this.materialForm.resetForm();
    //console.log(this.materialForm)

  }
  chooseOneSided() {
    this.isDisabledMaterial = false;
    this.blankColorFlag = false;
    this.oneSidedMaterialFlag = true;
    this.twoSidedMaterialFlag = false;
    this.getFullColorOneSided();
  }
  chooseTwoSided() {
    this.blankColorFlag = false;
    this.oneSidedMaterialFlag = false;
    this.twoSidedMaterialFlag = true;
    this.isDisabledType = true;
    this.isDisabledDimensions = true;
    this.addressFlag = false;
    //this.isDisabledMaterial = true;
    this.getFullColorTwoSided();
  }





  // async sendData(form: NgForm) {
  async sendData(form) {

    this.sizeData.push({
      widthFt: this.clientForm.value.enteredWidthFt,
      widthIn: this.clientForm.value.enteredWidthIn,
      heightFt: this.clientForm.value.enteredHeightFt,
      heightIn: this.clientForm.value.enteredHeightIn,
      blankProdMaterial: this.clientForm.value.blankMaterialValue,
      fullColorOneSideMaterial: this.clientForm.value.fullColorOneSidedValue,
      fullColorTwoSideMaterial: this.clientForm.value.fullColorTwoSidedValue,
      prodType: this.clientForm.value.enteredProdType,
      name: this.clientForm.value.userName.value,
      address: this.clientForm.value.address.value,
      price: this.filteredObj.price
    });
    console.log(this.sizeData)
    const postSendData = this._http.post(this.url + 'product-data', this.sizeData, httpOptions).toPromise();
    const fromServer: any = await postSendData;
    //console.log(this.sizeData);
    //console.log(fromServer, 'data from server');
    form.resetForm();
    this.filteredObj = { width: 0, height: 0, price: 0 };
  }

  sendAddress() {
    const userData = {
      name: this.firstFormGroup.controls.userName.value,
      address: this.secondFormGroup.controls.address.value
    }
    console.log(userData);
  }


  goToNext() {
    this.addressFlag = true;
    this.nextBtnFlag = true;
   // this.sendRequestBtn = false;
    //
  }

  addressOnChange(event) {
    console.log(event)
    //const sendDataFlag = this.clientForm.get('address').touched

  }






}
