import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [],
  templateUrl: './cart-panel.component.html'
})
export class CartPanelComponent {

  @Input() items: CartItem[] = []; 
}
