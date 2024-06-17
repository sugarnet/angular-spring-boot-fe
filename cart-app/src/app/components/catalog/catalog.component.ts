import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

  @Input() products!: Product[];
  

  constructor(private productService: ProductService, 
    private sharingDataService: SharingDataService) {
  }
  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

  addToCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }

}
