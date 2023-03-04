import { Component, Input } from "@angular/core";

@Component({
  selector: "app-rating-diagram",
  templateUrl: "./rating-diagram.component.html",
  styleUrls: ["./rating-diagram.component.css"],
})
export class RatingDiagramComponent {
  @Input() rates!: number[];
}
