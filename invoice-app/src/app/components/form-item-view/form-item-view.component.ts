import { Component, EventEmitter, Output } from '@angular/core';
import { InvoiceItem } from '../../models/invoice-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-item-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-item-view.component.html'
})
export class FormItemViewComponent {
  @Output() addItemEventEmitter = new EventEmitter();
  private counterId = 4;

  item: any = {
    product: '',
    price: '',
    quantity: ''
  }
}
