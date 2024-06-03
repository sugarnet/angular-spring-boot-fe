import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartPanelComponent } from '../cart-panel/cart-panel.component';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CartPanelComponent],
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  @Output() closeCartEventEmitter = new EventEmitter();
  @Output() removeFromCartEventEmitter = new EventEmitter();

  closeCart(): void {
    this.closeCartEventEmitter.emit();
  }

  removeFromCart(idProduct: number): void {
    this.removeFromCartEventEmitter.emit(idProduct);
  }

}
