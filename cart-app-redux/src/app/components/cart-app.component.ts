import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { SharingDataService } from '../services/sharing-data.service';
import { CatalogComponent } from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  items: CartItem[] = [];
  total: number = 0;

  constructor(private router: Router, 
    private sharingDataService: SharingDataService) { }

  ngOnInit() {
    this.items = JSON.parse(sessionStorage.getItem("cart") || '[]');
    this.calculateTotal();
    this.removeFromCart();
    this.addToCart();
  }

  addToCart(): void {

    this.sharingDataService.productEventEmitter.subscribe(product => {
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
      this.router.navigate(['/cart'], {
        state: {items: this.items, total: this.total}
      });
      Swal.fire({
        title: "Cart Item",
        text: "Cart Item Added!",
        icon: "success"
      });
    });
  }

  removeFromCart(): void {

    this.sharingDataService.idProductEventEmitter.subscribe(id => {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('removeFromCart' + id);
          this.items = this.items.filter(item => item.product.id !== id);
          
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
          }
          this.calculateTotal();
          this.saveSession();
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/cart'], {
              state: {items: this.items, total: this.total}
            });
          });
          Swal.fire({
            title: "Removed!",
            text: "Your item has been removed.",
            icon: "success"
          });
        }
      });
    });
  }

  calculateTotal() {
    this.total = this.items.reduce((accumulator, item) => accumulator + item.product.price * item.quantity, 0);
  }

  saveSession() {
    sessionStorage.setItem("cart", JSON.stringify(this.items));
  }

}
