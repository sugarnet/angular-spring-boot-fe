import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/users/auth.service';
import { Sale } from 'src/app/sales/models/sale';
import { SaleService } from 'src/app/sales/services/sale.service';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Detalle Cliente";
  selectedPhoto: File;
  progress: number = 0;
  urlBackend = URL_BACKEND;

  constructor(private clienteService: ClienteService, private modalService: ModalService, public authService: AuthService, private saleService: SaleService) {

  }
  ngOnInit(): void {
    
  }

  pickPhoto(event) {
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
    console.log(this.selectedPhoto);

    if (this.selectedPhoto.type.indexOf("image") < 0) {
      Swal.fire("Error", "Debe seleccionar un archivo de tipo imagen.", 'error');
      this.selectedPhoto = null;
    }
  }

  uploadPhoto() {

    if (!this.selectedPhoto) {
      Swal.fire("Error", "Debe seleccionar una foto.", 'error');

    } else {
      this.clienteService.upload(this.selectedPhoto, this.cliente.id)
      .subscribe(event => {
        //this.cliente = cliente;
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total) ;
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;

          this.modalService.notificarUpload.emit(this.cliente);

          Swal.fire("La foto se ha subido con éxito", `${response.message}`, 'success');
        }


      });
    }
  }

  cerrarModal() {
    this.modalService.close();
    this.selectedPhoto = null;
    this.progress = 0;
  }

  getModal(): boolean {
    return this.modalService.getModal();
  }

  delete(sale: Sale) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Se eliminará la Factua ${sale.id}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.saleService.deleteSale(sale.id).subscribe(result => {
          this.cliente.sales = this.cliente.sales.filter(s => s !== sale);
          swalWithBootstrapButtons.fire(
            'Eliminada!',
            `La Factura ${sale.id} ha sido eliminada`,
            'success'
          )

        });
      }
    })
  }

}
