import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [],
  templateUrl: './cart-panel.component.html'
})
export class CartPanelComponent implements OnChanges {
  
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  @Output() idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotal();
    this.saveSession();
  }

  removeFromCart(idProduct: number) {
    this.idProductEventEmitter.emit(idProduct);
  }
  
  calculateTotal() {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
  }

  saveSession() {
    sessionStorage.setItem("cart", JSON.stringify(this.items));
  }
  
}
