import { Component, Input } from "@angular/core";

@Component({
  selector: "app-mat-chip-item",
  templateUrl: "./mat-chip-item.component.html",
  styleUrls: ["./mat-chip-item.component.css"],
})
export class MatChipItemComponent {
  @Input() label: string = "";
  @Input() value: string = "";
  @Input() selected: boolean = false;
}
