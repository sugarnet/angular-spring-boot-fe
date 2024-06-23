import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartItem } from '../models/cart-item';
import { SharingDataService } from '../services/sharing-data.service';
import { CatalogComponent } from './catalog/catalog.component';
import { NavbarComponent } from './navbar/navbar.component';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ItemsState } from '../store/items.reducer';
import { add, remove, total } from '../store/items.action';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];

  constructor(
    private store: Store<{ items: ItemsState }>,
    private router: Router,
    private sharingDataService: SharingDataService
  ) {
    this.store.select('items').subscribe((state) => {
      console.log('state changed!');

      this.items = state.items;
      this.saveSession();
    });
  }

  ngOnInit() {
    this.store.dispatch(total());
    this.removeFromCart();
    this.addToCart();
  }

  addToCart(): void {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
      console.log('Product added to cart:', product);

      this.store.dispatch(add({ product }));
      this.store.dispatch(total());

      this.router.navigate(['/cart']);
      Swal.fire({
        title: 'Cart Item',
        text: 'Cart Item Added!',
        icon: 'success',
      });
    });
  }

  removeFromCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('removeFromCart' + id);

          this.store.dispatch(remove({ id }));
          this.store.dispatch(total());

          this.router.navigate(['/cart']);
          Swal.fire({
            title: 'Removed!',
            text: 'Your item has been removed.',
            icon: 'success',
          });
        }
      });
    });
  }

  saveSession() {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }
}
