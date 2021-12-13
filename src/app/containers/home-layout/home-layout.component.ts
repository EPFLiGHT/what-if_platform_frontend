import { TypingAnimationDirective } from 'angular-typing-animation';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  showDetails = false;

  start: boolean = false;

  X: string;
  Y: string;
  Z: string;

  XSet: string[] = ['intensified', 'relaxed', 'extended', 'shortened'];

  YSet: string[] = [
    'school closing',
    'workplace closing',
    'canceling public events',
    'restrictions on gatherings',
    'public transport closing',
    'stay at home requirements',
    'public information campaigns',
    'restrictions on internal movement',
    'international travel controls',
  ];

  ZSet: string[] = [
    'Austria',
    'Belgium',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Ireland',
    'Italy',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Netherlands',
    'Norway',
    'Portugal',
    'Romania',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'the United Kingdom',
  ];

  constructor() {}

  ngOnInit(): void {
    this.onTypingAnimationComplete();
  }

  onTypingAnimationComplete() {
    setTimeout(() => this.start = false, 1000)
    this.X = this.XSet[this.getRandomInt(this.XSet.length)];
    this.Y = this.YSet[this.getRandomInt(this.YSet.length)];
    this.Z = this.ZSet[this.getRandomInt(this.ZSet.length)];
    setTimeout(() => this.start = true, 1000)
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
