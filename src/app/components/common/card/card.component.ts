import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @ViewChild('customCard', {static: false}) customCard: ElementRef;
  @Input() data: any;

  public expanded: boolean = false;
  public imageURL: string;
  public title: string;
  public myStyles: {
    width: string;
    height: string;
    transform: string;
  };

  constructor() { }

  ngOnInit() {
    this.title = this.data.name;
    this.imageURL = this.createImageURL(this.title);
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

  private createImageURL(title: string): string {
    const imageName = title.toLowerCase().replace(/\s+/g, '');
    return `${imageName}.jpg`;
  }

}
