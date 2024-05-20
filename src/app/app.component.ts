import { Component } from '@angular/core';
import { CardAnulada, CardData } from './app.types';
import { AppService } from './app.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-lady-lee';

  cards:CardData[] = [];
  cardsAnulada:CardAnulada[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions:any = {
    chart: {
      type: 'column'
    },
    title: {
      text: ' Top 10 de vendedores',
    },
    credits: {
      enabled: false,
    },
    series: [{
      data: []
    }]
  };

  constructor(
    private appService:AppService
  ){
    this.cards = this.appService.getTotalDeVentasPorTiendaa();

    this.appService.getTopSellers()
    .map(x=>{
      this.chartOptions.series[0].data.push([x.seller, x.totalSales])
    })

    this.cardsAnulada = this.appService.getCancelledInvoicePercentageByStore();
  }
}
