import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  readonly apiUrl = "https://655cf25525b76d9884fe3153.mockapi.io/v1/external-companies";

  constructor(private httpClient: HttpClient) {

  }

  registerCompany(parceiroData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/`, parceiroData);
  }

  getAllCompany(): Observable<Company> {
    return this.httpClient.get<any>(`${this.apiUrl}/`);
  }

  deleteByIdCompany(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }

  putByIdCompany(id: string, CompanyData: Company): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}/${id}`, CompanyData);
  }

}
