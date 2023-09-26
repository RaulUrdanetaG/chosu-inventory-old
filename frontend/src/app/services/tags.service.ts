import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  isNewTagModal: boolean = false;
  isModifyTagModal: boolean = false;

  tags: string[] = [];

  //  creates observable for tags variable
  private _tags = new BehaviorSubject<string[]>(['']);
  tags$ = this._tags.asObservable();

  constructor(private http: HttpClient) {}

  getTags() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl + '/tags'));
  }

  async setTags() {
    // gets tags from the db
    const resTags = await this.getTags();
    this.tags = [];
    // stores the tags retrieved from db into the observable
    resTags.forEach((tag: any) => {
      this.tags.push(tag.tagname);
    });
    // updates the observable
    this._tags.next(this.tags);
  }

  createTag(tagname: string) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/addTag', tagname)
    );
  }

  openNewTagModal(command: string) {
    if (command === 'open') {
      this.isNewTagModal = true;
    } else if (command === 'close') {
      this.isNewTagModal = false;
    }
  }
}
