import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  open() {
    this.modal = true;
  }

  close() {
    this.modal = false;
  }

  getModal(): boolean {
    return this.modal;
  }
}
