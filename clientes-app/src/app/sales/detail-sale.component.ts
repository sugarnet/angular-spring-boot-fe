import { Component, OnInit } from '@angular/core';
import { Sale } from './models/sale';
import { SaleService } from './services/sale.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-sale',
  templateUrl: './detail-sale.component.html'
})
export class DetailSaleComponent implements OnInit {

  sale: Sale;
  title: string = 'Sale';

  constructor(private saleService: SaleService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.saleService.getSale(id).subscribe(sale => {
        console.log(sale);
        this.sale = sale;
      });
    });
  }

}
