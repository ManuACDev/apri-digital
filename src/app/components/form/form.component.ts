import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity } from '../../models/entity';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Section } from '../../models/section';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() entity: Entity | null = null;
  @Input() entityType!: string;
  @Output() submitForm = new EventEmitter<Entity>();

  entityForm: FormGroup;
  imageFile: File | null = null;
  videoFile: File | null = null;
  additionalImages: File[] = [];

  constructor(private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      imageSrc: ['', Validators.required],
      images: [[]],
      videoUrl: [''],
      sections: this.fb.array([])
    });

    if (this.entity?.sections) {
      this.entity.sections.forEach(section => this.addSection(section));
    }
  }

  ngOnInit() {
    if (this.entity) {
      this.entityForm.patchValue(this.entity);
    }
  }

  get sections(): FormArray {
    return this.entityForm.get('sections') as FormArray;
  }

  addSection(section?: Section) {
    const sectionForm = this.fb.group({
      title: [section?.title || '', Validators.required],
      content: [section?.content || '', Validators.required]
    });
    this.sections.push(sectionForm);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoFile = file;
    }
  }

  onImagesSelected(event: any) {
    const files = Array.from(event.target.files);
    this.additionalImages = files as File[];
  }

  onSubmit() {
    if (this.entityForm.valid) {
      //this.submitForm.emit(this.entityForm.value);
      const formData = this.entityForm.value;
      console.log('Formulario enviado:', formData);
    }
  }
  
}
