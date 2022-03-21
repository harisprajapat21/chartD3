import { Component } from '@angular/core';
import { DataApiService } from './service/data-api.service';
import { MarketPrice } from './service/market-price';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chartD3';
  marketStatus: MarketPrice[] | undefined;
  marketStatusToPlot: MarketPrice[] | undefined;
  langData:any;
  slideTimeLeft:number=15;
  interval:any;
  set MarketStatus(status: MarketPrice[]) {
    this.marketStatus = status;
    this.marketStatusToPlot = this.marketStatus.slice(0, 20);
  }

  constructor(private dataApi: DataApiService) {
    this.dataApi.getInitialMarketStatus().subscribe((prices) => {
      this.MarketStatus = prices;
      this.onActiveSlideChange();
    });
    this.dataApi.getTechLangData().subscribe((lang)=>{
      this.langData = lang;
    })
  }
  onActiveSlideChange(event?: any) {
    clearInterval(this.interval);
    this.slideTimeLeft = 15;
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.slideTimeLeft > 0) {
        this.slideTimeLeft--;
      } else {
        this.slideTimeLeft = 15;
      }
    },1000)
  }

}
