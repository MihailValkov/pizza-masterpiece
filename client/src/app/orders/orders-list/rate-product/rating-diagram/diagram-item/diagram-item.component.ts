import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-diagram-item',
  templateUrl: './diagram-item.component.html',
  styleUrls: ['./diagram-item.component.css'],
})
export class DiagramItemComponent implements OnInit {
  @Input() rate!: number;
  @Input() index!: number;
  starIconsCount: null[] = [];

  ngOnInit(): void {
    this.starIconsCount = new Array(this.index + 1);
  }
}
