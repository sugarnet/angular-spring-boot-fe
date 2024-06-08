import { Component, EventEmitter, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [],
  templateUrl: './cart-panel.component.html'
})
export class CartPanelComponent {
  
  items: CartItem[] = [];
  total: number = 0;

  idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {

  }

  removeFromCart(idProduct: number) {
    this.idProductEventEmitter.emit(idProduct);
  }
  
  
}
