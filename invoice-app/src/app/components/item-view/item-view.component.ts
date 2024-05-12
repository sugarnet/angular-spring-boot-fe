import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceItem } from '../../models/invoice-item';

@Component({
  selector: 'tr[app-item-view]',
  standalone: true,
  imports: [],
  templateUrl: './item-view.component.html'
})
export class ItemViewComponent {

  @Input() item: InvoiceItem = new InvoiceItem();

  @Output() removEventEmitter: EventEmitter<number> = new EventEmitter();

  remove(id: number): void {
    this.removEventEmitter.emit(id);
  }
}
