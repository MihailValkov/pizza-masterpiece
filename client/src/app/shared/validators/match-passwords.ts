import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get("password")?.value;
    const repeatPassword = control.get("repeatPassword")?.value;

    if (password && repeatPassword && password !== repeatPassword) {
      control.get("repeatPassword")?.setErrors({ isNotSame: true });
      return { isNotSame: true };
    }

    if (password && repeatPassword && password === repeatPassword) {
      control.get("repeatPassword")?.setErrors(null);
      return null;
    }
    return null;
  };
}
