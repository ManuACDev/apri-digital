import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { CardComponent } from "../../components/card/card.component";
import { CommonModule } from '@angular/common';
import { Entity } from '../../models/entity';
import { FirestoreService } from '../../services/firestore.service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [TitleComponent, CardComponent, CommonModule],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.css'
})
export class ProjectsPageComponent implements OnInit {

  projects: Entity[] = [];
  isAuthenticated: boolean = false;

  constructor(private firestoreService: FirestoreService, private auth: AuthService) {
    this.auth.getAuthState().subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnInit() {
    this.getProyectos();
  }

  toggleForm() {
    /*this.showForm = !this.showForm;
    this.interaction.clearMessages();
    this.editing = false;
    this.entity = null;*/
  }

  async getProyectos(): Promise<void> {
    try {
      
      const proyectos = await lastValueFrom(this.firestoreService.getCollection<Entity>("Proyectos"));
      //this.proyectos = proyectos.sort((a, b) => b.id - a.id);
      this.projects = proyectos;

    } catch (error) {
      console.error("Error al obtener los proyectos: ", error);
    }
  }

}
