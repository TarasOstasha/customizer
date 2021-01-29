import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
  colorFlag: boolean;
  materialFlag: boolean;

  materials = [
    { value: '10 oz Vinyl' },
    { value: '13 oz Vinyl (Most Popular)' },
    { value: '13 oz Smooth Vinyl' },
    { value: '18 oz Opaque Vinyl' }
  ]

  constructor() { }

  ngOnInit() {
  }

  chooseBlank() {
    this.colorFlag = !this.colorFlag;
  }

  selectedMaterial(val) {
    console.log('material- ', val)
    this.materialFlag = true;
  }

}
