import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../store/items.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  title: string = 'Counter App using Redux!';
  counter: number = 0;

  constructor(private store: Store<{ counter: number }>) {
    this.store
      .select('counter')
      .subscribe((counter) => (this.counter = counter));
  }

  increment(): void {
    // this.counter++;
    this.store.dispatch(increment({ add: 3 }));
    console.log('incrementing...');
  }

  decrement(): void {
    // this.counter--;
    this.store.dispatch(decrement());
    console.log('decrementing...');
  }

  reset(): void {
    // this.counter = 0;
    this.store.dispatch(reset());
    console.log('reseting...');
  }
}
