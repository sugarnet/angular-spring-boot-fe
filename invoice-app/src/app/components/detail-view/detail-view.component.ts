import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceItem } from '../../models/invoice-item';
import { ItemViewComponent } from '../item-view/item-view.component';

@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [ItemViewComponent],
  templateUrl: './detail-view.component.html'
})
export class DetailViewComponent {

  @Input() items: InvoiceItem[] =[];

  @Output() removeEventEmitter: EventEmitter<number> = new EventEmitter();

  remove(id: number): void {
    this.removeEventEmitter.emit(id);
  }
}
