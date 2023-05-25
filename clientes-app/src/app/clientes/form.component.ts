import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public regions: Region[];
  public titulo: string = "Crear Cliente";
  public errors: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.load();
  }


  public create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(response => {
      this.router.navigate(['/clientes']);
      Swal.fire('Nuevo Cliente', `Cliente ${this.cliente.nombre} creado con éxito`, 'success');
    },
      err => {
        this.errors = err.error.errors as string[];
      }
    );

  }

  public load(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.get(id).subscribe(cliente => this.cliente = cliente);
      }
    });

    this.clienteService.getRegions().subscribe(regions => this.regions = regions);
  }

  public update(): void {
    console.log(this.cliente);
    this.cliente.sales = null;
    this.clienteService.update(this.cliente).subscribe(response => {
      this.router.navigate(['/clientes']);
      Swal.fire(`Cliente Actualizado: ${response.cliente.nombre}`, response.message, 'success');
    },
      err => {
        this.errors = err.error.errors as string[];
      });
  }

  compareRegion(o1: Region, o2: Region) {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}
