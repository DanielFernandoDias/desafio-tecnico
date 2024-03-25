import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from '../interfaces/partner.interface';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  readonly apiUrl = "https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners";

  constructor(private httpClient: HttpClient) {

  }

  registerPartner(parceiroData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/`, parceiroData);
  }

  getAllPartner(): Observable<Partner> {
    return this.httpClient.get<any>(`${this.apiUrl}/`);
  }

  deleteByIdPartner(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }

  putByIdPartner(id: string, parceiroData: Partner): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}`, parceiroData);
  }


}
