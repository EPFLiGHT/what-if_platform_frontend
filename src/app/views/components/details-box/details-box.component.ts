import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-box',
  templateUrl: './details-box.component.html',
  styleUrls: ['./details-box.component.scss'],
})
export class DetailsBoxComponent implements OnInit {
  @Input() title : string;
  @Input() description : string;
  @Input() icon : string;
  
  showDetails = false;

  constructor() {}

  ngOnInit(): void {}
}
