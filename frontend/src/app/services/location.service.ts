import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AppConfig } from '../config';
import { Location } from '../interfaces/locations';

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  isNewLocationModal: boolean = false;
  isUpdateLocationModal: boolean = false;
  isDeleteLocationModal: boolean = false;

  locations: Location[] = [];

  private _selectedLocation = new BehaviorSubject<Location>({ _id: '', location: '' });
  SelectedLocation$ = this._selectedLocation.asObservable();

  //  creates observable for tags variable
  private _locations = new BehaviorSubject<Location[]>([]);
  locations$ = this._locations.asObservable();

  constructor(private http: HttpClient) {}

  getLocations() {
    return firstValueFrom(this.http.get<any>(AppConfig.baseUrl + '/locations'));
  }

  async setLocations() {
    // gets tags from the db
    const resLocations = await this.getLocations();
    this.locations = [];
    // stores the tags retrieved from db into the observable
    resLocations.forEach((location: any) => {
      this.locations.push(location);
    });
    // updates the observable
    this._locations.next(this.locations);
  }

  setSelectedLocation(location: Location) {
    // updates observable
    this._selectedLocation.next(location);
  }

  createLocation(location: any) {
    return firstValueFrom(
      this.http.post<any>(AppConfig.baseUrl + '/locations/addLocation', location)
    );
  }

  updateLocation(location: any) {
    return firstValueFrom(
      this.http.put<any>(AppConfig.baseUrl + `/locations/${location._id}`, location)
    );
  }

  deleteLocation(location:Location){
    return firstValueFrom(
      this.http.delete<any>(AppConfig.baseUrl + `/locations/${location._id}`)
    );
  }
}
