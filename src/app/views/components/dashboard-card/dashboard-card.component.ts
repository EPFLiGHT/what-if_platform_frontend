import { style } from '@angular/animations';
import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() leftIcon : string | boolean
  @Input() titleText = ''
  @Input() subtitle = ''
  @Input() actionName = ''
  @Input() rightIcon = ''
  @Input() bgColor = ''

  constructor(
    private elementRef : ElementRef
  ) { }

  ngOnInit(): void {
    this.elementRef.nativeElement.style.setProperty('--dynamic-color', this.bgColor);
    this.elementRef.nativeElement.style.setProperty('--dynamic-color-alpha', this.bgColor + 'c0');
  }

}
