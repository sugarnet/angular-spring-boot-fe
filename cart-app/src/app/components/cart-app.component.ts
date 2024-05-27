import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartPanelComponent } from './cart-panel/cart-panel.component';
import { CartItem } from '../models/cart-item';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, CartPanelComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.findAll();
  }

  addToCart(product: Product): void {
    console.log('Product added to cart:', product);

    const hasItem = this.items.find(item => item.product.id === product.id);

    if (hasItem) {
      this.items = this.items.map(item => {
        if (item.product.id === product.id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item;
      });
    } else {
      this.items = [...this.items, { product: {...product}, quantity: 1 }];
    }

  }

  removeFromCart(idProduct: number): void {
    this.items = this.items.filter(item => item.product.id !== idProduct);
  }

}
