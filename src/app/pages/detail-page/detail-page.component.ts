import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule],
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
