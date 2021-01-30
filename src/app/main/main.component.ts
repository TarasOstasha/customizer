import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Size } from '../models/size';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  // flags to change select state
  colorFlag: boolean;
  fullColor: boolean;
  materialFlag: boolean;
  oneSidedMaterialFlag: boolean;
  twoSidedMaterialFlag: boolean;

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

  constructor() { }

  ngOnInit() {
  }

  chooseBlank() {
    this.colorFlag = true;
    this.fullColor = false;
    this.oneSidedMaterialFlag = false;
    this.twoSidedMaterialFlag = false;
  }

  chooseFullColor() {
    this.fullColor = true;
    this.materialFlag = false;
    this.colorFlag = false;
  }

  chooseOneSided() {
    this.oneSidedMaterialFlag = true;
    this.twoSidedMaterialFlag = false;
  }

  chooseTwoSided() {
    this.twoSidedMaterialFlag = true;
    this.oneSidedMaterialFlag = false;
  }

  selectedMaterial(val) {
    console.log('material- ', val)
    this.materialFlag = true;
    this.enteredProdMaterial = val;
  }

  selectedType(val) {
    this.enteredProdType = val;
  }



  sendData(form: NgForm) {
    this.sizeData.push({ 
      widthFt: this.enteredWidthFt, 
      widthIn: this.enteredWidthIn, 
      heightFt: this.enteredHeightFt, 
      heightIn: this.enteredHeightIn,
      prodMaterial: this.enteredProdMaterial,
      prodType: this.enteredProdType 
    });
    console.log(this.sizeData);
    form.resetForm();
  }
  resetForm() {

  }

}
