import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-single-feature-selection',
  templateUrl: './single-feature-selection.component.html',
  styleUrls: ['./single-feature-selection.component.scss']
})
export class SingleFeatureSelectionComponent implements OnInit {
  @Input() featureName : string;
  @Input() defaultValue : string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
