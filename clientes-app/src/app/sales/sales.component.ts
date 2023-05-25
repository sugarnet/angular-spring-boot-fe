import { Component, OnInit } from '@angular/core';
import { Sale } from './models/sale';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable, flatMap, map, mergeMap, startWith } from 'rxjs';
import { ProductService } from '../products/service/product.service';
import { Product } from './models/product';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SaleItem } from './models/sale-item';
import { SaleService } from './services/sale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})
export class SalesComponent implements OnInit {

  title: string = 'Nueva Factura';
  sale: Sale = new Sale();

  autocompleteControl = new FormControl();
  filteredProducts: Observable<Product[]>;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute, private productService: ProductService, private saleService: SaleService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      let clienteId = +param.get('clienteId');
      this.clienteService.get(clienteId).subscribe(cliente => this.sale.cliente = cliente);
    });

    this.filteredProducts = this.autocompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.name),
      mergeMap(value => value ? this._filter(value) : [])
    );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();

    return this.productService.findProductsByName(filterValue);
  }

  showName(product?: Product): string | undefined {
    return product ? product.name : undefined;
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void {

    let product = event.option.value as Product;
    console.log(product);

    if (this.itemExists(product.id)) {
      this.incrementAmount(product.id);
    } else {
      let newItem = new SaleItem();
      newItem.product = product;
      this.sale.saleItems.push(newItem);
    }

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();

  }

  updateAmount(id: number, event: any): void {

    let amount: number = event.target.value as number;

    if (amount <= 0) {
      return this.deleteItem(id);
    }

    this.sale.saleItems = this.sale.saleItems.map((item: SaleItem) => {
      if (id === item.product.id) {
        item.amount = amount;
      }
      return item;
    });
  }

  itemExists(id: number): boolean {
    let exists: boolean = false;

    this.sale.saleItems.forEach((item: SaleItem) => {
      if (item.product.id === id) {
        exists = true;
      }
    });
    return exists;
  }

  incrementAmount(id: number): void {
    this.sale.saleItems = this.sale.saleItems.map((item: SaleItem) => {
      if (id === item.product.id) {
        ++item.amount;
      }
      return item;
    });
  }

  deleteItem(id: number): void {

    this.sale.saleItems = this.sale.saleItems.filter((item: SaleItem) => item.product.id != id);
  }

  create(saleForm: any): void {

    if (this.sale.saleItems.length == 0) {
      this.autocompleteControl.setErrors({ 'invalid': true });
    }

    if (saleForm.form.valid && this.sale.saleItems.length > 0) {

      console.log(this.sale);
      this.saleService.create(this.sale).subscribe(sale => {
        Swal.fire(`Factura creada`, `Factura Nro ${sale.id}`, 'success');
        this.router.navigate(["/sales", sale.id]);
      });
    }

  }
}
