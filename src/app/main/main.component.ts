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
    this.colorFlag = !this.colorFlag;
  }

  selectedMaterial(val) {
    console.log('material- ', val)
    this.materialFlag = true;
  }

}
