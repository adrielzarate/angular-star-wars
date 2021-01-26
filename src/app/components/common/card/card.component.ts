import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @ViewChild('customCard', {static: false}) customCard: ElementRef;
  @Input() imagesFolderName: string;
  @Input() data: any;

  public expanded: boolean = false;
  public imageURL: string;
  public title: string;
  public myStyles: {
    width: string;
    height: string;
    transform: string;
  };
  public characteristics: {key: string; value: string}[];

  constructor() { }

  ngOnInit() {
    this.title = this.data.name;
    this.characteristics = this.prepareCharacteristics(this.data);
    this.imageURL = Utils.createImageURL(this.title, this.imagesFolderName);
  }

  public prepareCharacteristics(data) {
    const list: {key: string; value: string}[] = [];
    for ( const property in data ) {
      list.push(
        {
          key: property,
          value: data[property]
        }
      )
    }
    return list;
  }

  public expandCard() {

    const cardWindowOffsetLeft = this.customCard.nativeElement.offsetLeft;
    const cardWindowOffsetTop = this.customCard.nativeElement.offsetTop;
    const windowScrollTop = window.pageYOffset;
    const leftPadding = 10;
    const topPadding = 40;
    const bottomPadding = 10;

    const transformX = -cardWindowOffsetLeft + leftPadding;
    const transformY = -cardWindowOffsetTop + topPadding + windowScrollTop;

    this.myStyles = {
      width: `calc(100vw - ${leftPadding * 2}px)`,
      height: `calc(100vh - ${topPadding + bottomPadding}px)`,
      transform: `translate3d(${transformX}px, ${transformY}px, 0px) rotateY(180deg)`
    };

    this.expanded = true;
  }

  public closeCard() {
    this.myStyles = {
      width: 'inherit',
      height: 'inherit',
      transform: `translate3d(0px, 0px, 0px)`
    };

    this.expanded = false;
  }



}
