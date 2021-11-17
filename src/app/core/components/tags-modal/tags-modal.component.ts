import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Tag, TagCategory } from 'src/app/core/models/tag';
import { UiHelper } from 'src/app/core/services/helpers/toast.service';
import { TagService } from 'src/app/core/services/http/tag.service';

@Component({
  selector: 'app-tags-modal',
  templateUrl: './tags-modal.component.html',
  styleUrls: ['./tags-modal.component.scss'],
})
export class TagsModalComponent implements OnInit {
  @Input() data;

  filteredTagsCategories: TagCategory[];
  tagsCategories$: TagCategory[];
  matchingTags: Tag[] = [];
  selectedTags: Tag[] = [];

  constructor(
    private tags$: TagService,
    private modalController: ModalController,
    private ui: UiHelper,
    private crf: ChangeDetectorRef
  ) {}

  isSelected(tag: Tag) {
    return this.selectedTags.map((tag) => tag.name).includes(tag.name);
  }

  ionViewWillEnter() {
    this.selectedTags = [...this.data];
    this.crf.markForCheck();
  }

  toggleTag(tag: Tag) {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(
        (tagElem) => tagElem !== tag
      );
    } else {
      this.selectedTags.push(tag);
    }
  }

  search(event: any) {
    const text = event.srcElement.value.toLowerCase();
    this.filteredTagsCategories = this.tagsCategories$.filter((cat) => {
      this.matchingTags = [];
      return (
        cat.name.includes(text) ||
        cat.tags.some((tag) => {
          if (tag.name.toLowerCase().includes(text)) {
            this.matchingTags.push(tag);
            return true;
          }
          return false;
        })
      );
    });
  }

  async closeModal() {
    await this.modalController.dismiss(this.selectedTags);
  }

  ngOnInit() {
    this.selectedTags = this.data && [...this.data];
    this.ui.presentLoading('tags-retrieving');
    this.tags$
      .getTagsByCategory()
      .subscribe((data) => {
        this.tagsCategories$ = data;
        this.filteredTagsCategories = this.tagsCategories$;
        this.ui.dismissLoading('tags-retrieving')
      });
  }
}
