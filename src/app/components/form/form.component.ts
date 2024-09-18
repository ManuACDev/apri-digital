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

  imageSrc: File | null = null;
  images: File[] = [];
  videoUrl: File | null = null;

  constructor(private fb: FormBuilder) {
    this.entityForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      imageSrc: [''],
      images: [[]],
      videoUrl: [''],
      sections: this.fb.array([])
    });

    /*if (this.entity?.sections) {
      this.entity.sections.forEach(section => this.addSection(section));
    }*/
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
      content: [section?.content || '', Validators.required],
      list: [section?.list || '']
    });
    this.sections.push(sectionForm);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageSrc = file;
      console.log("Imagen seleccionada: ", file);
    } else {
      this.imageSrc = null;
    }
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoUrl = file;
    }
  }

  onImagesSelected(event: any) {
    const files = Array.from(event.target.files);
    this.images = files as File[];
  }

  onSubmit() {
    if (this.entityForm.valid && this.imageSrc && this.images.length > 0 && this.sections.length > 0) {
      const sections = this.sections.value.map((section: any) => ({
        ...section,
        list: section.list ? section.list.split('.').map((item: string) => item.trim()) : []
      }));

      const formData = {
        ...this.entityForm.value,
        sections,
        imageSrc: this.imageSrc,
        videoUrl: this.videoUrl,
        images: this.images
      };
      
      console.log("Formulario enviado:", formData);
      this.submitForm.emit(formData);
    } else {
      console.error("El formulario no es válido");
    }
  }
  
}
