import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() items: CartItem[] = [];

  @Output() openCartEventEmitter = new EventEmitter();

  openCart(): void {
    this.openCartEventEmitter.emit();
  }

}
