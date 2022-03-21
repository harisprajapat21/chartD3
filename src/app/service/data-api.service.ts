
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MarketPrice} from './market-price';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private baseUrl =  'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getInitialMarketStatus() {
    return this.httpClient.get<MarketPrice[]>(`${this.baseUrl}/api/market`);
  }
  getTechLangData() {
    return this.httpClient.get<MarketPrice[]>(`${this.baseUrl}/api/tech/lang`);
  }
}
