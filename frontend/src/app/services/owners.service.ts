import { Injectable } from '@angular/core';
import { Owner } from '../interfaces/owners';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  isNewOwnerModal: boolean = false;
  isUpdateOwnerModal: boolean = false;
  isDeleteOwnerModal: boolean = false;

  owners: Owner[] = [];

  private _selectedOwner = new BehaviorSubject<Owner>({ _id: '', owner: '' });
  SelectedOwner$ = this._selectedOwner.asObservable();

  //  creates observable for tags variable
  private _owners = new BehaviorSubject<Owner[]>([]);
  owners$ = this._owners.asObservable();

  constructor(private http: HttpClient) {}

  getOwners() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl + '/owners'));
  }

  async setOwners() {
    // gets tags from the db
    const resTags = await this.getOwners();
    this.owners = [];
    // stores the tags retrieved from db into the observable
    resTags.forEach((owner: any) => {
      this.owners.push(owner);
    });
    // updates the observable
    this._owners.next(this.owners);
  }

  setSelectedOwner(owner: Owner) {
    // updates observable
    this._selectedOwner.next(owner);
  }

  createOwner(owner: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/owners/addOwner', owner)
    );
  }

  updateOwner(owner: any) {
    return firstValueFrom(
      this.http.put<any>(AppConfig.baseUrl + `/owners/${owner._id}`, owner)
    );
  }

  deleteOwner(owner: Owner) {
    return firstValueFrom(
      this.http.delete<any>(AppConfig.baseUrl + `/owners/${owner._id}`)
    );
  }
}
