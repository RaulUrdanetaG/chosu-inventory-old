import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class ImageCarouselComponent implements OnInit {
  selectedIndex = 0;
  images: string[] = [];
  controls: boolean = true;
  indicators: boolean = true;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.selectedItem$.subscribe((item) => {
      this.images = [];
      item.imagelink.forEach((link) => {
        this.images.push(link);
      });
    });
  }

  selectImage(index: number) {
    this.selectedIndex = index;
  }

  close() {
    this.itemsService.isImageCarousel = false;
  }

  onPrevClick() {
    if (this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex = this.selectedIndex - 1;
    }
  }

  onNextClick() {
    if (this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex = this.selectedIndex + 1;
    }
  }
}
