import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck {

  @Input() data;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    console.log('ngDoCheck', this.data);
  }

}
