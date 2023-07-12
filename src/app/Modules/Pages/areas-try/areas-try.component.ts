import { Component, Output } from '@angular/core';
import { AreaModel } from 'src/app/shared/models/area.model';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ExtendModalAlertComponent } from '../../Components/extend-modal-alert/extend-modal-alert.component';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { IconChartFiller } from 'src/app/shared/models/icon-chart.model';
import { AreaService } from 'src/app/shared/services/area.service';
import { ExtendModalFormComponent } from '../../Components/extend-modal-form/extend-modal-form.component';
import { BoardTable, BoardTableFiller } from 'src/app/shared/models/board-table.model';
import { IconChartComponent } from '../../Components/icon-chart/icon-chart.component';
import { TableExtendInformationComponent } from '../../Components/table-extend-information/table-extend-information.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-areas-try',
  templateUrl: './areas-try.component.html',
  styleUrls: ['./areas-try.component.css']
})
export class AreasTryComponent {


  area: AreaModel = {} as AreaModel;
  filler: ExtendModalFiller[] = [];
  view: Array<IconChartFiller> = []
  view1: any[] = []
  tableView: Date = {} as Date;
  soleView: IconChartFiller = {} as IconChartFiller
 
  constructor(
    private _areaService: AreaService,
    private notificationService: NotificationService,
    private searchService: SearchBarService,
    private modal: MatDialog,

  ) { }

  ngOnInit() {
    this.searchService.getModelName("area", "areas");
    this.searchService.$searchArrayService.subscribe((res: any) => {
      this.view1 = res;
      let view: IconChartFiller[] = res.map((res: AreaModel) => ({
        itemId: res.id || "",
        iconUrl: res.iconUrl,
        itemName: res.nombreArea,
        itemOne: res.codigo
      }
      ))
      this.view = view;
      this.soleView = view[0]
    });

  }
  async showAlert(alert: string): Promise<boolean> {
    const dialogRef: MatDialogRef<ExtendModalAlertComponent> = this.modal.open(ExtendModalAlertComponent, { data: alert });
    return await dialogRef.afterClosed().toPromise();
  }
  ExtensInfo(id: number) {
    const view = (this.view.find(res => res.itemId === id))

    let titles = ["ID", "Nombre de area", "Codigo"]
    if (view) {

      const modalRef: MatDialogRef<TableExtendInformationComponent> = this.modal.open(TableExtendInformationComponent, { data: Date, })
    }
  }
  delete(data: { itemId: number, itemName: string }) {
    this.showAlert("¿Desea borrar : " + data.itemName + "?").then((response: boolean) => {
      if (response) {
        this.searchService.getModelName("area", "areas");
        this.deleteArea(data.itemId);
        this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
      } else { }
    });

  }
  deleteArea(event: number) {
    this._areaService.borrarArea(event).subscribe(() => {
    })
  }
  update(id: number) {

  }
  guardarArea(area: AreaModel) {
    this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
    if (area.id) {
      this._areaService.actualizarArea(area).subscribe(() => {
      });
    } else {
      this._areaService.guardarArea(area).subscribe(() => {
      });
    }
  }
  openModalCreate() {
    this.filler = [{
      fieldName: "Nombre de Area",
      control: "text",
      uppercase: true
    }
      , {
      fieldName: "Codigo",
      control: "number",
    },
    {
      fieldName: "Url de Icono",
      control: "string",
    }, {
      fieldName: "textarea",
      type: "textarea"
    }
    ]
    var pass: incomeData = {
      filler: this.filler, title: "Crear area"
    }
    const dialogRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent, { data: pass })
    dialogRef.afterClosed().subscribe(gets => {
      if (gets) {
        this.area = {
          nombreArea: gets[0],
          codigo: gets[1],
          iconUrl: gets[2]
        }
        this.guardarArea(this.area)
        this.searchService.getModelName("area", "areas")
      }
    })
  }
}
