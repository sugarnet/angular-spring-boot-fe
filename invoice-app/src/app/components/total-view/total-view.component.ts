import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-total-view',
  standalone: true,
  imports: [],
  templateUrl: './total-view.component.html'
})
export class TotalViewComponent {

  @Input() total: number = 0;

}
