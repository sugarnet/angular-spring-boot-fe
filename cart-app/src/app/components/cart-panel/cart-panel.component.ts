import { Component, EventEmitter, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-cart-panel',
  standalone: true,
  imports: [],
  templateUrl: './cart-panel.component.html'
})
export class CartPanelComponent {
  
  items: CartItem[] = [];
  total: number = 0;

  constructor(private sharingDataService: SharingDataService, private router: Router) {

    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }

  removeFromCart(idProduct: number) {
    this.sharingDataService.idProductEventEmitter.emit(idProduct);
  }
  
  
}
