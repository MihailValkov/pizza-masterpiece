import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AbstractControl, UntypedFormBuilder, Validators } from "@angular/forms";
import { IFileImageUpload } from "../interfaces/image-upload";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"],
})
export class FileUploadComponent {
  @Input() isLoading: boolean = false;
  @Output() onPickFile: EventEmitter<IFileImageUpload> = new EventEmitter();

  inputControl: AbstractControl = this.fb.control(null, {
    validators: Validators.required,
  });

  constructor(private fb: UntypedFormBuilder) {}

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const file: File | null = element.files && element.files[0];

    if (!file?.type.includes("image")) {
      this.setUploadedFile({ file: null, imageUrl: "" });
      return this.inputControl?.setErrors({ type: true });
    }
    if (file) {
      this.inputControl.setValue(file);
      const reader = new FileReader();
      reader.onload = () =>
        this.setUploadedFile({
          file,
          imageUrl: reader.result as string,
        });
      reader.readAsDataURL(file);
    }
  }

  setUploadedFile({ file, imageUrl }: IFileImageUpload) {
    this.onPickFile.emit({
      file,
      imageUrl,
    });
  }

  uploadHandler(inputRef: HTMLInputElement) {
    inputRef.click();
    this.inputControl.markAsTouched();
  }
}
