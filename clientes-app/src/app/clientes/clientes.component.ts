import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../users/auth.service';
import { URL_BACKEND } from '../config/config';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  urlBackend = URL_BACKEND;

  constructor(private clienteService: ClienteService, private modalService: ModalService, private activatedRoute: ActivatedRoute, public authService: AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClientesComponent: Tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });
        })
      ).subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });

    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(cteOriginal => {
        if (cteOriginal.id == cliente.id) {
          cteOriginal.photo = cliente.photo;
        }
        return cteOriginal;
      });
    });
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Se eliminará ${cliente.nombre} ${cliente.apellido}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clientes = this.clientes.filter(cte => cte.id !== cliente.id);
        this.clienteService.delete(cliente.id).subscribe(result => {
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `El cliente ${cliente.nombre} ha sido eliminado`,
            'success'
          )

        });
      }
    })
  }

  openModalCliente(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.open();
  }

}
