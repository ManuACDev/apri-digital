import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent implements OnInit {

  entity: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap) => {
      const paramValue = paramMap.get('data');
      
      if (paramValue) {
        try {
          this.entity = JSON.parse(paramValue);
        } catch (e) {
          console.error('Error parsing JSON', e);
          this.entity = paramValue;
        }
      }
    });
  }
  
}
