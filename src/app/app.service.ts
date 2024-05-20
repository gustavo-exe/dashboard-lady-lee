import { Injectable } from '@angular/core';
import { data } from './data';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getTotalDeVentasPorTiendaa() {
    const salesByStore = data.reduce((acc, invoice) => {
      const store = invoice.store;
      const total = invoice.invoiceTotal;

      if (!acc[store]) {
        acc[store] = 0;
      }

      acc[store] += total;

      return acc;
    }, {} as { [store: string]: number });

    return Object.keys(salesByStore).map(store => ({
      store,
      totalSales: salesByStore[store]
    }));
  }

  getTopSellers() {

    const salesBySeller = data.reduce((acc, invoice) => {
      const seller = invoice.seller;
      const total = invoice.invoiceTotal;

      if (!acc[seller]) {
        acc[seller] = 0;
      }

      acc[seller] += total;

      return acc;
    }, {} as { [seller: number]: number });

    return Object.keys(salesBySeller)
      .map(seller => ({
        seller: parseInt(seller, 10),
        totalSales: salesBySeller[seller as any]
      }))
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 10);

  }

  getCancelledInvoicePercentageByStore() {
    const storeStats = data.reduce((acc, invoice) => {
      const store = invoice.store;
      const isCancelled = invoice.invoiceStatus === 'Anulada';

      if (!acc[store]) {
        acc[store] = { total: 0, cancelled: 0 };
      }

      acc[store].total += 1;
      if (isCancelled) {
        acc[store].cancelled += 1;
      }

      return acc;
    }, {} as { [store: string]: { total: number, cancelled: number } });

    return Object.keys(storeStats).map(store => ({
      store,
      cancelledPercentage: ((storeStats[store].cancelled / storeStats[store].total) * 100)
    }));
  }

}
