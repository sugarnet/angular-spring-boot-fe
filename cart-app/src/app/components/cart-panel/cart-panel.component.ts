import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [],
  templateUrl: './cart-panel.component.html'
})
export class CartPanelComponent {

  @Input() items: CartItem[] = [];

  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  removeFromCart(idProduct: number) {
    this.idProductEventEmitter.emit(idProduct);
  }
  
}
