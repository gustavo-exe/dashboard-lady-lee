import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CardAnulada, CardData } from './app.types';
import { AppService } from './app.service';
import * as Highcharts from 'highcharts';
import { data } from './data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  displayedColumns: string[] = ['uid', 'invoiceDate', 'clientName', 'store', 'invoiceTotal'];
  dataSource = new MatTableDataSource(data);

  storeName = ['LL Alameda','LL Mega mall', 'LL Lima', 'LL Satelite' , 'LL Cascadas', 'LL Rotan' , 'LL El progreso', 'LL Citymall']
  slectedStore:string = '';

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

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
  }

  dataSourceFilterByStore(value:string){
    this.slectedStore = value;
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
