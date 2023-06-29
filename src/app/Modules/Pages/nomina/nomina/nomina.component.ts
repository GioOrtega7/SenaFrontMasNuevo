import { Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { NominaService } from 'src/app/shared/services/nomina.service';


@Component({
  selector: 'app-nomina',
  templateUrl: './nomina.component.html',
  styleUrls: ['./nomina.component.css']
})
export class NominaComponent {
  progreso: number = 0;
  cargandoArchivo = false;
  errorOccurred = true;
  uploadingFile: boolean | undefined;
  fileToUpload: null | undefined;
  urlVista: string | undefined;


  constructor(
    private _uiNotificationService: NotificationService,
    private _importarExcel: NominaService,

  ) { }


  importarDocumetosMora(event: any) {
    event.preventDefault();
    this.uploadingFile = true;
    this.errorOccurred = false;
    this.cargandoArchivo = true;
    const archivo = event.target.documento.files[0];
    const reader = new FileReader();

    reader.onloadstart = () => {
      this.progreso = 0;
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        this.progreso = Math.round((event.loaded / event.total) *48 );
      }
    };
    this._importarExcel.importarExcel(archivo).subscribe(
      response => {
        console.log(response);
        this._uiNotificationService.showNotification({ message: "Ok! importación completada", type: "success" });
        this.cargandoArchivo = false;

      },
      error => {
        console.log(error);
        this._uiNotificationService.showNotification({ message: "verifica la estructura de tu archivo ", type: "fail" });
        this.cargandoArchivo = false;
      }
    );
    reader.readAsDataURL(archivo);
  }

  refreshPage() {
    location.reload();
  }


  descargar() {
    const url = 'http://127.0.0.1:8000/api/nominaReporte';
    window.open(url);
  }
  descargar2() {
    const url = 'http://127.0.0.1:8000/api/Reporte';
    window.open(url);
  }

  generar(){
    alert('ya puedes generar la certificacion')
  }




}
