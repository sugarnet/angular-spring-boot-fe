import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {

  @Input() url: string = '';
  @Input() paginator: any = {};

  
}
