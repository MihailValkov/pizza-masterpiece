import { Component, Inject } from "@angular/core";
import { MatLegacySnackBarRef as MatSnackBarRef, MAT_LEGACY_SNACK_BAR_DATA as MAT_SNACK_BAR_DATA } from "@angular/material/legacy-snack-bar";

@Component({
  selector: "app-snack-bar",
  templateUrl: "./snack-bar.component.html",
  styleUrls: ["./snack-bar.component.css"],
})
export class SnackBarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: {
      message: string;
      action: string;
      status: "success" | "error";
    },
    private snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) {}

  actionHandler(): void {
    this.snackBarRef?.dismiss();
  }
}
