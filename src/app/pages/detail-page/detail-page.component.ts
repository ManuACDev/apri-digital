import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TitleComponent } from "../../components/title/title.component";

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {

  entity: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.entity = navigation?.extras.state?.['product'];
  }

}
