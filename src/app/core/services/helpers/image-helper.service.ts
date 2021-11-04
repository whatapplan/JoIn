import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs';
import { retry, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageHelperService {
  constructor(private storage: AngularFireStorage) {}

  getImagesDownloadUrls$(
    files: File[]
  ): { name: string; url$: Observable<string> }[] {
    let response$: { name: string; url$: Observable<string> }[] = [];
    const date = Date.now();
    files.forEach((file) => {
      const filePath = `plans/${date + '-' + UUID.UUID()}`;
      response$.push({
        name: file.name,
        url$: this.storage
          .upload(filePath, file, { contentType: file.type })
          .snapshotChanges()
          .pipe(
            switchMap((_) => this.storage.ref(filePath).getDownloadURL()),
            retry(3)
          ),
      });
    });
    return response$;
  }
}
