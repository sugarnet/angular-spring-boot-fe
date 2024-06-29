import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product';
import { SharingDataService } from '../../services/sharing-data.service';
import { load } from '../../store/products.actions';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  @Input() products!: Product[];

  constructor(private store: Store<{ products: any }>,
    private sharingDataService: SharingDataService) {
    this.store.select('products').subscribe(state => this.products = state.products);
  }
  ngOnInit(): void {
    this.store.dispatch(load());
  }

  addToCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }

}
