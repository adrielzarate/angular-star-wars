import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public data = [
    {name: 'a'},
    {name: 'b'},
    {name: 'c'},
    {name: 'd'}
  ];

  constructor() { }

  ngOnInit() {
  }

  updateData() {
    this.data[0].name = 'a updated';
  }

}
