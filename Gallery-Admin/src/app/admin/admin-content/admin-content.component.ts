import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-content',
  templateUrl: './admin-content.component.html',
  styleUrls: ['./admin-content.component.css'],
})
export class AdminContentComponent implements OnInit {
  @Input()
  folders: string[] | null;

  @Output()
  createFolder: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  removeFolder: EventEmitter<string> = new EventEmitter<string>();

  categoryForm: FormGroup;
  displayStyle: string = 'none';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      folderName: ['', Validators.required],
    });
  }

  openPopup() {
    this.displayStyle = 'block';
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  onCategoryConfirmed() {
    if (this.categoryForm.invalid) {
      return;
    }

    const categoryForm = this.categoryForm.get('folderName');

    this.createFolder.emit(categoryForm?.value!);
    this.closePopup();
    this.categoryForm.reset();
  }

  onRemoveClicked(folderName: string) {
    this.removeFolder.emit(folderName);
  }
}
