import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cart-item';
import { NavbarComponent } from './navbar/navbar.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];
  items: CartItem[] = [];
  total: number = 0;
  showCart: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = this.productService.findAll();
    this.items = JSON.parse(sessionStorage.getItem("cart") || '[]');
    this.calculateTotal();
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
    this.calculateTotal();
    this.saveSession();
  }

  removeFromCart(idProduct: number): void {
    this.items = this.items.filter(item => item.product.id !== idProduct);
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal() {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
  }

  saveSession() {
    sessionStorage.setItem("cart", JSON.stringify(this.items));
  }

  openCloseCart(): void {
    this.showCart = !this.showCart;
  }

}
