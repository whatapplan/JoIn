import { Component, OnInit } from '@angular/core';
import { TagCategory } from 'src/app/core/models/tag';
import { TagService } from 'src/app/core/services/http/tag.service';

@Component({
  selector: 'app-plan-creation',
  templateUrl: './plan-creation.page.html',
  styleUrls: ['./plan-creation.page.scss'],
})
export class PlanCreationPage implements OnInit {
  private tagCategories: TagCategory[];
  constructor(private tags$: TagService) {}

  ngOnInit() {
    this.tags$.getTagsByCategory().subscribe((cat) => {
      this.tagCategories = cat;
      console.log(this.tagCategories);
    });
  }
}
