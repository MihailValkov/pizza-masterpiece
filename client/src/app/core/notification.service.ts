import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarComponent } from "../shared/snack-bar/snack-bar.component";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(
    message: string,
    status: "error" | "success",
    horizontalPosition: "start" | "end" | "center" = "center",
    verticalPosition: "top" | "bottom" = "bottom"
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        status,
        action: "Close",
      },
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: 3000,
    });
  }
}
