import { Component } from '@angular/core';
import { GrupoModel } from 'src/app/shared/models/grupo.model';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ExtendModalAlertComponent } from '../../Components/extend-modal-alert/extend-modal-alert.component';
import { ChargeWheelFiller } from 'src/app/shared/models/charge-wheel.model';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { MaterialFormacion } from 'src/app/shared/models/material-formacion.model';
import { MaterialFormacionService } from 'src/app/shared/services/material-formacion.service';
import { ExtendModalFormComponent } from '../../Components/extend-modal-form/extend-modal-form.component';

@Component({
  selector: 'app-material-formacion-create',
  templateUrl: './material-formacion-create.component.html',
  styleUrls: ['./material-formacion-create.component.css']
})
export class MaterialFormacionCreateComponent {

  MF: MaterialFormacion = {} as MaterialFormacion;
  filler: ExtendModalFiller[]=[];
  view: Array<ChargeWheelFiller>=[];
  soleView: ChargeWheelFiller={} as ChargeWheelFiller;

  constructor(
    private _MFService: MaterialFormacionService,
    private notificationService: NotificationService,
    private searchService: SearchBarService,
    private modal: MatDialog,

  ){ }

  ngOnInit(){

    this.searchService.getModelName("materialformacion", "materialformaciones");
    this.searchService.$searchArrayService.subscribe((res: any) => {
      let view: ChargeWheelFiller[] = res.map((res: MaterialFormacion) => ({
        itemId: res.id || "",
        itemName: res.codigoMF,
        itemCode: res.id,
        itemOne: res.descripcion,
        itemTwo: res.rutaarchivo,

      }
      ))
      this.view = view;
      this.soleView = this.view[0]
    })

  }
  async showAlert(alert: string): Promise<boolean> {
    const dialogRef: MatDialogRef<ExtendModalAlertComponent> = this.modal.open(ExtendModalAlertComponent, { data: alert });
    return await dialogRef.afterClosed().toPromise();
  }

  delete(data:{itemId: number, itemName: string}){
    this.showAlert("¿Desea borrar : " + data.itemName + "?").then((response: boolean) => {
      if (response) {
        this.searchService.getModelName("materialformacion", "materialformaciones");
        this.deleteArea(data.itemId);
        this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
      } else {}
    });
  }

  deleteArea(event: number) {
    this._MFService.eliminarMaterialFormacion(event).subscribe(() => {
    })
  }

  update(data: ChargeWheelFiller){
    this.filler = [{
      fieldName: "CodigoMF",
      type:"textarea",
      control: " ",
      dataPlacer: data.itemName
    }
      , {
      fieldName: "descripcion",
      type:"textarea",
      control: " ",
      dataPlacer: data.itemOne
    },
    {
      fieldName: "ruta",
      type:"textarea",
      control: " ",
      dataPlacer: data.itemTwo
    }
    ]
    var pass: incomeData = {
      filler: this.filler, title: "Actualizar MF"
    }
    const modalRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent,{data: pass})
    modalRef.afterClosed().subscribe(res =>{
      this.MF={
        id:data.itemId,
        codigoMF: res[0],
        descripcion:res[1],
        rutaarchivo:res[2],
      } 
      this.guardarMF(this.MF);
      this.searchService.getModelName("grupo", "grupos");
    })
  }

  guardarMF(MF: MaterialFormacion) {
    this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
    if (MF.id) {
      this._MFService.actualizarMaterialFormacion(MF).subscribe(() => {
      });
    } else {
      this._MFService.crearMaterialFormacion(MF).subscribe(() => {
      });
    }
  }

  openModalCreate() {
    this.filler = [
      { 
      fieldName: "CodigoMF",
      type:"textarea",
      control: "",
    }
      , {
      fieldName: "descripcion",
      type:"textarea",
      control: "",
    },
    {
      fieldName: "ruta",
      type:"textarea",
      control: "",
    }
  ]
    var pass: incomeData = {
      filler: this.filler, title: "Crear MF"
    }
    const dialogRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent, { data: pass })
    dialogRef.afterClosed().subscribe(gets => {
      if (gets) {
        this.MF = {
          codigoMF: gets[0],
          descripcion:gets[1],
          rutaarchivo:gets[2],

        }
        this.guardarMF(this.MF)
        this.searchService.getModelName("materialformacion", "materialformaciones");
      }
    })
  }




  


}
