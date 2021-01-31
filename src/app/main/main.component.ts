import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Size } from '../models/size';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
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
  enteredProdMaterial: string;
  enteredProdType: string;

  sizeData: Size[] = [];

  // for blank color selected
  materials = [
    { value: '10 oz Vinyl' },
    { value: '13 oz Vinyl (Most Popular)' },
    { value: '13 oz Smooth Vinyl' },
    { value: '18 oz Opaque Vinyl' }
  ]
  // for fill color selected
  oneSidedMaterial = [
    { value: '9 oz Mesh Vinyl' },
    { value: '10 oz Vinyl' },
    { value: '13 oz Vinyl (Most Popular)' },
    { value: '13 oz Smooth Vinyl' },
    { value: '18 oz Vinyl' },
    { value: 'Poly-Poplin Fabric' },
    { value: 'Super Poly Knit Fabric' }
  ]
  twoSidedMaterial = [
    { value: '13 oz Smooth Vinyl' },
    { value: '18 oz Opaque Vinyl (Most Popular)' },
    { value: 'Poly-Poplin Fabric' },
    { value: 'Super Poly Knit Fabric' }
  ]

  finishType = [
    { value: 'Standard - Double Fold/Double Stitch & Grommets' },
    { value: 'Standard - Double Fold/Double Stitch, Grommets & Rope' },
    { value: 'Reinforced Corners - Double Fold/Double Stitch & Grommets' },
    { value: 'Reinforced Corners - Double Fold/Double Stitch, Grommets & Rope' },
    { value: 'Webbing - Double Fold/Double Stitch' },
    { value: 'Webbing - Double Fold/Double Stitch & Grommets' },
    { value: 'D-Ring with Webbing - Double Fold/Double Stitch D-Rings in corners' },
    { value: 'D-Ring with Webbing - Double Fold/Double Stitch D-Rings in corners & Grommets' },
    { value: 'Display Style - Double Fold/Single Stitch NO Grommets' },
    { value: 'Display Style - Double Fold/Single Stitch with Grommets' },
    { value: 'Pole Pockets - Single Fold/Single Stitch Pole Pocket Top/Btm No sewn sides' },
    { value: 'Pole Pockets - Single Fold/Single Stitch Pole Pocket Top ONLY No sewn sides' },
    { value: 'Pole Pockets - Double Fold/Top&Bottom Pole Pocket Sewn sides' },
    { value: 'Pole Pockets - Double Fold/Single Stitch Pole Pocket Top ONLY Sewn sides' },
    { value: 'Sewn Double-Folded/Double Stitched Pockets, no sewn sides' },
    { value: 'Sewn Double-Folded/Double Stitched Pockets, sewn sides' },
    { value: 'Please Select a Finishing Type' },
  ]

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      userName: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required]
    });
  }



  selectedMaterial(val) {
    console.log('material- ', val)
    this.isDisabledDimensions = false;
    //this.materialFlag = true;
    this.enteredProdMaterial = val;
  }

  selectedType(val) {
    this.enteredProdType = val;
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
  }
  chooseOneSided() {
    this.isDisabledMaterial = false;
    this.blankColorFlag = false;
    this.oneSidedMaterialFlag = true;
    this.twoSidedMaterialFlag = false;

  }
  chooseTwoSided() {
    this.blankColorFlag = false;
    this.oneSidedMaterialFlag = false;
    this.twoSidedMaterialFlag = true;
    this.isDisabledType = true;
    this.isDisabledDimensions = true;
    this.addressFlag = false;
    //this.isDisabledMaterial = true;
  }





  sendData(form: NgForm) {
    if( this.secondFormGroup.controls.address.value == '' && this.secondFormGroup.controls.address.value == '' ) {
      alert('Please Fill Out The Form!');
      return
    }
    this.sizeData.push({ 
      widthFt: this.enteredWidthFt, 
      widthIn: this.enteredWidthIn, 
      heightFt: this.enteredHeightFt, 
      heightIn: this.enteredHeightIn,
      prodMaterial: this.enteredProdMaterial,
      prodType: this.enteredProdType,
      name: this.firstFormGroup.controls.userName.value,
      address: this.secondFormGroup.controls.address.value
    });
    console.log(this.sizeData);
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
  }


}
