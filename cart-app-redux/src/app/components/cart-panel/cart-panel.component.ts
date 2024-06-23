import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/cart-item';
import { SharingDataService } from '../../services/sharing-data.service';
import { ItemsState } from '../../store/items.reducer';
import { total } from '../../store/items.action';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [],
  templateUrl: './cart-panel.component.html',
})
export class CartPanelComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private store: Store<{ items: ItemsState }>,
    private sharingDataService: SharingDataService
  ) {
    this.store.select('items').subscribe((state) => {
      this.items = state.items;
      this.total = state.total;
    });
  }
  ngOnInit(): void {}

  removeFromCart(idProduct: number) {
    this.sharingDataService.idProductEventEmitter.emit(idProduct);
  }
}
