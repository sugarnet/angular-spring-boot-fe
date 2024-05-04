import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  counter: number = 0;

  @Input() title!: string;

  @Output() counterEmmit: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0;
    console.log('create component');
  }

  setCounter(): void {
    this.counter = this.counter + 1;
    sessionStorage.setItem('counter', this.counter.toString());
    this.counterEmmit.emit(this.counter);
  }
}
