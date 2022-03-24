import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent implements OnInit {
  message = '';
  action = '';
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    private data: { message: string; action: string },
    private snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) {}

  ngOnInit(): void {
    this.message = this.data.message;
    this.action = this.data.action;
  }

  actionHandler(): void {
    this.snackBarRef.dismiss();
  }
}
