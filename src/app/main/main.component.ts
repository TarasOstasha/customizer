import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// models
import { Size } from '../models/size';
import { Select } from '../models/select';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  myForm: FormGroup;
  @ViewChild("materialForm") materialForm: ElementRef;
  f: NgForm;
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
  sendRequestBtn: boolean = true;

  enteredWidthFt: number;
  enteredWidthIn: number;
  enteredHeightFt: number;
  enteredHeightIn: number;
  enteredBlankProdMaterial: string;
  enteredFullColorOneSideMaterial: string;
  enteredFullColorTwoSideMaterial: string;
  enteredProdType: string;

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

  constructor(
    private _formBuilder: FormBuilder,
    private _http: HttpClient
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      userName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required]
    });

    
  }

  // selectedMaterial(val) {
  //   console.log('material- ', val)
  //   this.isDisabledDimensions = false;
  //   //this.materialFlag = true;
  //   this.enteredProdMaterial = val;
  // }

  selectedBlankMaterial() {
    this.isDisabledDimensions = false;
    this.enteredBlankProdMaterial = this.blankSelectedValue;
    console.log(this.enteredBlankProdMaterial);
    this.getFinishType();    
  }
  selectedFullColorOneSideMaterial() {
    this.isDisabledDimensions = false;
    this.enteredFullColorOneSideMaterial = this.fullColorOneSideSelectedValue;
    console.log(this.enteredFullColorOneSideMaterial);
    this.getFinishType();
  }
  selectedFullColorTwoSideMaterial() {
    this.isDisabledDimensions = false;
    this.enteredFullColorTwoSideMaterial = this.fullColorTwoSideSelectedValue;
    console.log(this.enteredFullColorTwoSideMaterial);
    this.getFinishType();
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





  async sendData(form: NgForm) {
    if (this.secondFormGroup.controls.address.value == '' && this.secondFormGroup.controls.address.value == '') {
      alert('Please Fill Out The Form!');
      return
    }
    this.sizeData.push({
      widthFt: this.enteredWidthFt,
      widthIn: this.enteredWidthIn,
      heightFt: this.enteredHeightFt,
      heightIn: this.enteredHeightIn,
      blankProdMaterial: this.enteredBlankProdMaterial,
      fullColorOneSideMaterial: this.enteredFullColorOneSideMaterial,
      fullColorTwoSideMaterial: this.fullColorTwoSideSelectedValue,
      prodType: this.enteredProdType,
      name: this.firstFormGroup.controls.userName.value,
      address: this.secondFormGroup.controls.address.value
    });
    const postSendData = this._http.post(this.url + 'product-data', this.sizeData, httpOptions).toPromise();
    const fromServer: any = await postSendData;
    //console.log(this.sizeData);
    console.log(fromServer, 'data from server')
    form.resetForm();
  }

  // sendAddress(form: NgForm) {
  //   if(form.invalid) {
  //     return
  //   }
  //   console.log(form.value.name)

  //   form.resetForm();

  // }
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
    this.sendRequestBtn = false;
    //
  }



}
