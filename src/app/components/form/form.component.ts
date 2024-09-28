import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entity } from '../../models/entity';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Section } from '../../models/section';
import { CommonModule } from '@angular/common';
import { InteractionService } from '../../services/interaction.service';

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
  @Input() loading: boolean = false;
  @Input() editing: boolean = false;
  @Output() submitForm = new EventEmitter<Entity>();
  @Input() successMessage: string | null = null;
  @Input() errorMessage: string | null = null;

  entityForm: FormGroup;

  imageSrc: File | null = null;
  images: File[] = [];
  videoUrl: File | null = null;

  constructor(private fb: FormBuilder, public interaction: InteractionService) {
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
      this.entityForm.patchValue({
        title: this.entity.title,
        subtitle: this.entity.subtitle,
        imageSrc: '',
        videoUrl: '',
      });
  
      if (this.entity.sections) {
        this.sections.clear();
        this.entity.sections.forEach(section => this.addSection(section));
      }
    }
  }

  get sections(): FormArray {
    return this.entityForm.get('sections') as FormArray;
  }

  addSection(section?: Section) {
    const sectionForm = this.fb.group({
      title: [section?.title || '', Validators.required],
      content: [section?.content || '', Validators.required],
      list: this.fb.array(section?.list ? section.list.map(item => this.fb.control(item)) : [])
    });
    this.sections.push(sectionForm);
  }  

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  addListItem(sectionIndex: number) {
    const list = this.getList(sectionIndex);
    list.push(this.fb.control(''));
  }
  
  removeListItem(sectionIndex: number, listIndex: number) {
    const list = this.getList(sectionIndex);
    list.removeAt(listIndex);
  }
  
  getList(sectionIndex: number): FormArray {
    return (this.sections.at(sectionIndex) as FormGroup).get('list') as FormArray;
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
    this.interaction.clearMessages();

    const isEdit = this.editing;
    
    if (this.entityForm.valid && (this.imageSrc || isEdit) && (this.images.length > 0 || isEdit)) {
      if (this.sections.length === 0) {
        this.interaction.showErrorMessage("Debes añadir al menos una sección.");
        return;
      }

      const sections = this.sections.value.map((section: any) => ({
        ...section,
        list: section.list ? section.list.map((item: string) => item.trim()) : []
      }));

      const formData = {
        ...this.entityForm.value,
        sections,
        imageSrc: this.imageSrc ? this.imageSrc : this.entity?.imageSrc,
        videoUrl: this.videoUrl ? this.videoUrl : this.entity?.videoUrl,
        images: this.images.length > 0 ? this.images : this.entity?.images
      };
      
      const entityHasChanged = this.hasEntityChanged(formData);
  
      if (entityHasChanged) {
        this.submitForm.emit(formData);
        this.interaction.showSuccessMessage("Formulario enviado correctamente.");
      } else {
        this.interaction.showErrorMessage("No se han detectado cambios en el formulario.");
      }
    } else {
      this.interaction.showErrorMessage("Por favor, completa todos los campos requeridos.");
    }
  }

  hasEntityChanged(formData: Entity): boolean {
    if (!this.entity) {
      return true;
    }
  
    if (
      this.entity.title !== formData.title ||
      this.entity.subtitle !== formData.subtitle ||
      this.entity.imageSrc !== formData.imageSrc ||
      this.entity.videoUrl !== formData.videoUrl
    ) {
      return true;
    }
  
    if (this.entity.sections.length !== formData.sections.length) {
      return true;
    }
  
    for (let i = 0; i < this.entity.sections.length; i++) {
      const originalSection = this.entity.sections[i];
      const newSection = formData.sections[i];
  
      if (
        originalSection.title !== newSection.title ||
        originalSection.content !== newSection.content ||
        !this.areListsEqual(originalSection.list, newSection.list)
      ) {
        return true;
      }
    }
  
    return false;
  }
  
  areListsEqual(originalList: string[] = [], newList: string[] = []): boolean {
    if (originalList.length !== newList.length) {
      return false;
    }
  
    for (let i = 0; i < originalList.length; i++) {
      if (originalList[i] !== newList[i]) {
        return false;
      }
    }
  
    return true;
  }  
  
}
