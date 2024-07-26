import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _userEventEmitter: EventEmitter<User> = new EventEmitter();
  private _removeUserEventEmmiter = new EventEmitter();
  private _findUserByIdEventEmitter = new EventEmitter();
  private _selectUserEventEmitter = new EventEmitter();

  constructor() { }

  get userEventEmitter(): EventEmitter<User> {
    return this._userEventEmitter;
  }

  get removeUserEventEmmiter(): EventEmitter<number> {
    return this._removeUserEventEmmiter;
  }

  get findUserByIdEventEmitter() {
    return this._findUserByIdEventEmitter;
  }

  get selectUserEventEmitter() {
    return this._selectUserEventEmitter;
  }
}
