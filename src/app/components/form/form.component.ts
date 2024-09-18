import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity } from '../../models/entity';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() entity: Entity | null = null;
  @Input() entityType!: string;
  @Output() submitForm = new EventEmitter<Entity>();

  entityForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      imageSrc: ['', Validators.required],
      videoUrl: [''],
      sections: this.fb.array([])
    });
  }

  ngOnInit() {
    if (this.entity) {
      this.entityForm.patchValue(this.entity);
    }
  }

  onSubmit() {
    if (this.entityForm.valid) {
      this.submitForm.emit(this.entityForm.value);
    }
  }
  
}
