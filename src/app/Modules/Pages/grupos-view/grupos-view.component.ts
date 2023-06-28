import { Component } from '@angular/core';
import { GrupoModel } from 'src/app/shared/models/grupo.model';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ExtendModalAlertComponent } from '../../Components/extend-modal-alert/extend-modal-alert.component';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { ChargeWheelFiller } from 'src/app/shared/models/charge-wheel-filler.model';
import { GruposService } from 'src/app/shared/services/grupo.service';
import { ExtendModalFormComponent } from '../../Components/extend-modal-form/extend-modal-form.component';
import { TableExtendInformationComponent } from '../../Components/table-extend-information/table-extend-information.component';
import { BoardTable, BoardTableFiller, DateFiler } from 'src/app/shared/models/board-table.model';

@Component({
  selector: 'app-grupos-view',
  templateUrl: './grupos-view.component.html',
  styleUrls: ['./grupos-view.component.css']
})
export class GruposViewComponent {
  Grupos: GrupoModel = {} as  GrupoModel;
  filler: ExtendModalFiller[] = [];
  view: Array<ChargeWheelFiller> = []
  res:any[]=[]

  constructor(
    private _grupoService: GruposService,
    private notificationService: NotificationService,
    private searchService: SearchBarService,
    private modal: MatDialog,
  ) { }
  ngOnInit() {
    this.searchService.getModelName("grupo", "grupos");
    this.searchService.$searchArrayService.subscribe((res: any) => {
      let view: ChargeWheelFiller[] = res.map((res: GrupoModel) => ({
        itemId: res.id || "",
        itemName: res.nombre,
        itemFechainicio: res.fechaFinalGrupo,
        itemFechafin: res.fechaInicialGrupo,
      }
      ))
      this.view = view;
      this.res = res
    })
  }
  async showAlert(alert: string): Promise<boolean> {
    const dialogRef: MatDialogRef<ExtendModalAlertComponent> = this.modal.open(ExtendModalAlertComponent, { data: alert });
    return await dialogRef.afterClosed().toPromise();
  }
  ExtensInfo(id:number ){
    const view = this.view.find(res=>res.itemId===id)
    if(view){
      const Data =(Object(this.res.find(res=>res.id===id)))
      let Title: DateFiler={ 
        Title:view.itemName
    };
    console.log(Data)
    const modalRef: MatDialogRef<TableExtendInformationComponent> = this.modal.open(TableExtendInformationComponent, { data: Data,   })
    }
  }
  delete(data:{itemId: number, itemName: string}){
    this.showAlert("¿Desea borrar : " + data.itemName + "?").then((response: boolean) => {
      if (response) {
        this.searchService.getModelName("grupo", "grupos");
        this.deleteArea(data.itemId);
        this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
      } else {}
    });
  }
  deleteArea(event: number) {
    this._grupoService.eliminarGrupo(event).subscribe(() => {
    })
  }
  update(data: ChargeWheelFiller){
    this.filler = [{
      fieldName: "Numero Ficha",
      type:"input",
      control: "number",
      dataPlacer: data.itemName
    }
      , {
      fieldName: "Fecha inicio",
      type:"input",
      control: "date",
      dataPlacer: data.itemOne
    },
    {
      fieldName: "Fecha fin",
      type:"input",
      control: "date",
      dataPlacer: data.itemTwo
    },
    {
      fieldName: "Observacion",
      type:"textarea",
      control: "",
      dataPlacer: data.itemThree
    }
    ]
    var pass: incomeData = {
      filler: this.filler, title: "Actualizar grupo"
    }
    const modalRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent,{data: pass})
    modalRef.afterClosed().subscribe(res =>{
      this.Grupos={
        id:data.itemId,
        nombre: res[0],
        fechaInicialGrupo:res[1],
        fechaFinalGrupo:res[2],
        observacion:res[3]
      } 
      this.guardarGrupo(this.Grupos);
      this.searchService.getModelName("grupo", "grupos");
    })
  }
  guardarGrupo(grupo: GrupoModel) {
    this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
    if (grupo.id) {
      this._grupoService.actualizarGrupo(grupo).subscribe(() => {
      });
    } else {
      this._grupoService.crearGrupo(grupo).subscribe(() => {
      });
    }
  }
  openModalCreate() {
    this.filler = [
      { 
      fieldName: "Numero Ficha",
      type:"input",
      control: "number",
    }
      , {
      fieldName: "Fecha inicio",
      type:"input",
      control: "date",
    },
    {
      fieldName: "Fecha fin",
      type:"input",
      control: "date",
    },
    {
      fieldName: "Observacion",
      type:"textarea",
      control: "",
    }
  ]
    var pass: incomeData = {
      filler: this.filler, title: "Crear Grupo"
    }
    const dialogRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent, { data: pass })
    dialogRef.afterClosed().subscribe(gets => {
      if (gets) {
        this.Grupos = {
          nombre: gets[0],
          fechaInicialGrupo:gets[1],
          fechaFinalGrupo:gets[2],
          observacion:gets[3]
        }
        this.guardarGrupo(this.Grupos)
        this.searchService.getModelName("grupo", "grupos");
      }
    })
  }

}
