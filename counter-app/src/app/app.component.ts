import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'counter-app';

  subTitle = 'Contador con estado de session';
  
  users: string[] = ['Pepe', 'Maria', 'Juan', 'Andres'];
  
  visible: boolean = false;
  
  counter: number = 0;
  ngOnInit(): void {
    this.counter = parseInt(sessionStorage.getItem('counter')!) || 0;
  }

  setVisible(): void {
    this.visible = this.visible ? false : true;
    console.log('clic over setVisible');
  }

  setCounter(counter: number): void{
    this.counter = counter
    
  }
}
