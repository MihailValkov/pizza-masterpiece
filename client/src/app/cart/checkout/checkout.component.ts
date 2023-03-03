import { AfterContentChecked, AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { AddressFormService } from "./address-form.service";
import { UserFormService } from "./user-form.service";
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements AfterViewInit, AfterContentChecked {
  orientation: "vertical" | "horizontal" = "horizontal";
  width!: number;

  addressForm$ = this.addressFormService.addressForm$;
  userForm$ = this.userFormService.userForm$;

  @ViewChild("container") container!: ElementRef;

  constructor(private addressFormService: AddressFormService, private userFormService: UserFormService) {}

  ngAfterViewInit(): void {
    this.width = this.container.nativeElement.offsetWidth;
  }

  ngAfterContentChecked(): void {
    if (this.width < 600) {
      this.orientation = "vertical";
    }
  }
}
