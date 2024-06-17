import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();
  private _productEventEmitter: EventEmitter<Product> = new EventEmitter<Product>();

  constructor() { }

  get idProductEventEmitter(): EventEmitter<number> {
    return this._idProductEventEmitter;
  }

  get productEventEmitter(): EventEmitter<Product> {
    return this._productEventEmitter;
  }
}
