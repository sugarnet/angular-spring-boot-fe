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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.findAll();
  }

  addToCart(product: Product) {
    console.log('Product added to cart:', product);
    this.items = [...this.items, { product: {...product}, quantity: 1 }];
  }

}
