import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../config';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Tag } from '../interfaces/tags';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  isNewTagModal: boolean = false;
  isUpdateTagModal: boolean = false;
  isDeleteTagModal: boolean = false;

  tags: Tag[] = [];

  private _selectedTag = new BehaviorSubject<Tag>({ _id: '', tagname: '' });
  SelectedTag$ = this._selectedTag.asObservable();

  //  creates observable for tags variable
  private _tags = new BehaviorSubject<Tag[]>([]);
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
      this.tags.push(tag);
    });
    // updates the observable
    this._tags.next(this.tags);
  }

  setSelectedTag(tag: Tag) {
    // updates observable
    this._selectedTag.next(tag);
  }

  createTag(tagname: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/tags/addTag', tagname)
    );
  }

  updateTag(tag: any) {
    return firstValueFrom(
      this.http.put<any>(AppConfig.baseUrl + `/tags/${tag._id}`, tag)
    );
  }

  deleteTag(tag:Tag){
    return firstValueFrom(
      this.http.delete<any>(AppConfig.baseUrl + `/tags/${tag._id}`)
    );
  }
}
