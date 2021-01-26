import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Utils } from 'src/app/utils/utils';

interface IDataType {
  [key: string]: string
}

interface ICharacteristics {
  title: string;
  value: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @ViewChild('customCard', {static: false}) customCard: ElementRef;
  @Input() imagesFolderName: string;
  @Input() data: IDataType;

  public expanded: boolean = false;
  public imageURL: string;
  public title: string;
  public characteristics: ICharacteristics[];
  public myStyles: {
    width: string;
    height: string;
    transform: string;
  };

  private readonly LEFT_PADDING = 10;
  private readonly TOP_PADDING = 50;
  private readonly BOTTOM_PADDING = 10;

  ngOnInit() {
    this.title = this.data.name;
    this.characteristics = this.prepareCharacteristics(this.data);
    this.imageURL = Utils.createImageURL(this.title, this.imagesFolderName);
  }

  public setDefaultPic(): void {
    this.imageURL = Utils.DEFAULT_IMAGE_URL;
  }

  public prepareCharacteristics(data: IDataType): ICharacteristics[] {
    const list:  ICharacteristics[] = [];
    for ( const property in data ) {
      list.push(
        {
          title: property,
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

    const transformX = -cardWindowOffsetLeft + this.LEFT_PADDING;
    const transformY = -cardWindowOffsetTop + this.TOP_PADDING + windowScrollTop;

    this.myStyles = {
      width: `calc(100vw - ${this.LEFT_PADDING * 2}px)`,
      height: `calc(100vh - ${this.TOP_PADDING + this.BOTTOM_PADDING}px)`,
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
