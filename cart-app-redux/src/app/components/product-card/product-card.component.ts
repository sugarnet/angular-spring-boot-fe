import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'div[app-product-card]',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product!: Product;
  @Output() productEventEmitter: EventEmitter<Product> = new EventEmitter<Product>();

  addToCart(product: Product) {
    this.productEventEmitter.emit(product);
  }
}
