import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DataApiService } from './data-api.service';
import { MarketPrice } from './market-price';

describe('DataApiService', () => {
  let service: DataApiService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataApiService);
  });

  it('should be created same Instance', () => {
    inject([service], (injectService: DataApiService) => {
      expect(injectService).toBe(service);
    });
  });

  it('should return markit price data', () => {
    const marketPriceMockData: MarketPrice[] = [
      { date: '10-05-2012', close: 68.55, open: 74.55 },
      { date: '09-05-2012', close: 74.55, open: 69.55 },
      { date: '08-05-2012', close: 69.55, open: 62.55 },
      { date: '07-05-2012', close: 62.55, open: 56.55 },
    ];
    let response;
    spyOn(service, 'getInitialMarketStatus').and.returnValue(
      of(marketPriceMockData)
    );
    service.getInitialMarketStatus().subscribe((res) => {
      response = res;
    });
    expect(JSON.stringify(response)).toEqual(
      JSON.stringify(marketPriceMockData)
    );
  });
  it('should return technical language data', () => {
    const techLangData:any = [
      {
        Framework: 'Vue',
        Stars: '166443',
        Released: '2014',
      },
      {
        Framework: 'React',
        Stars: '150793',
        Released: '2013',
      },
    ];
    let response;
    spyOn(service, 'getTechLangData').and.returnValue(of(techLangData));
    service.getTechLangData().subscribe((res) => {
      response = res;
    });
    expect(JSON.stringify(response)).toEqual(JSON.stringify(techLangData));
  });
});
