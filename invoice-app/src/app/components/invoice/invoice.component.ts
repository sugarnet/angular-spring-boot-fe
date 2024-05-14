import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../services/Invoice.service';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { DetailViewComponent } from '../detail-view/detail-view.component';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { TotalViewComponent } from '../total-view/total-view.component';
import { FormItemViewComponent } from '../form-item-view/form-item-view.component';
import { InvoiceItem } from '../../models/invoice-item';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    InvoiceViewComponent,
    ClientViewComponent,
    CompanyViewComponent,
    DetailViewComponent,
    TotalViewComponent,
    FormItemViewComponent
  ],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
  invoice!: Invoice;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoice = this.invoiceService.getInvoice();
  }

  remove(id: number): void {
    this.invoice = this.invoiceService.remove(id);
  }

  addItem(item: InvoiceItem): void {
    this.invoice = this.invoiceService.addItem(item);
  }
}
