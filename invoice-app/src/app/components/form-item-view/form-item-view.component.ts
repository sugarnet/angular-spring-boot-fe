import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-item-view',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-item-view.component.html'
})
export class FormItemViewComponent {
  @Output() addItemEventEmitter = new EventEmitter();
  private counterId = 4;

  item: any = {
    product: '',
    price: '',
    quantity: ''
  }

  addItem(formItem: NgForm): void {

    if (formItem.valid) {
      this.addItemEventEmitter.emit({id: this.counterId, ...this.item});
      this.counterId++;
  
      this.item = {
        product: '',
        price: '',
        quantity: ''
      };
    }

    formItem.reset();
    formItem.resetForm();
  }
}
