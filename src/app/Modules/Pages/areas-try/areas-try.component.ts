import { Component } from '@angular/core';
import { AreaModel } from 'src/app/shared/models/area.model';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ExtendModalAlertComponent } from '../../Components/extend-modal-alert/extend-modal-alert.component';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { IconChart } from 'src/app/shared/models/icon-chart.model';
import { AreaService } from 'src/app/shared/services/area.service';
import { ExtendModalFormComponent } from '../../Components/extend-modal-form/extend-modal-form.component';


@Component({
  selector: 'app-areas-try',
  templateUrl: './areas-try.component.html',
  styleUrls: ['./areas-try.component.css']
})
export class AreasTryComponent {

  area: AreaModel = {} as AreaModel;
  filler: ExtendModalFiller[] = [];
  view: Array<IconChart> = []

  constructor(
    private _areaService: AreaService,
    private notificationService: NotificationService,
    private searchService: SearchBarService,
    private modal: MatDialog,

  ) { }

  ngOnInit() {
    this.searchService.getModelName("area", "areas");

    this.searchService.$searchArrayService.subscribe((res: any) => {
      let view: IconChart[] = res.map((res: AreaModel) => ({
        itemId: res.id || "",
        iconUrl: res.iconUrl,
        itemName: res.nombreArea,
        itemOne: res.codigo
      }
      ))

      this.view = view;

    })

  }

  async showAlert(alert: string): Promise<boolean> {
    const dialogRef: MatDialogRef<ExtendModalAlertComponent> = this.modal.open(ExtendModalAlertComponent, { data: alert });
  
    return await dialogRef.afterClosed().toPromise();
  }

  delete(data:{itemId: number, itemName: string}){
    
    this.showAlert("¿Desea borrar : " + data.itemName + "?").then((response: boolean) => {
      if (response) {
        this.searchService.getModelName("area", "areas");
        this.deleteArea(data.itemId);
        this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
      } else {}
    });

  }


  deleteArea(event: number) {
    this._areaService.borrarArea(event).subscribe(() => {
  

    })
  }


  update(data: IconChart){

    this.filler = [{
      fieldName: "Nombre de Area",
      type:"input",
      control: "text",
      dataPlacer: data.itemName,
      uppercase: true
    }
      , {
      fieldName: "Codigo",
      control: "number",
      dataPlacer: data.itemOne
    },
    {
      fieldName: "Icono asdasd asd aqwe ",
      control: "string",
      dataPlacer: data.iconUrl
    },
    {
      fieldName: "Icaono",
      type: "input",
      control: "date"
    }
    ]

    var pass: incomeData = {
      filler: this.filler, title: "Actualizar area"
    }

    const modalRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent,{data: pass})

    modalRef.afterClosed().subscribe(res =>{
      this.area={
        id:data.itemId,
        nombreArea: res[0],
        codigo:res[1]
      } 
      this.guardarArea(this.area);
      this.searchService.getModelName("area", "areas");
      
    })


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
      control: "date",
    },
    {
      fieldName: "Icono",
      control: "string",
    },{
      fieldName: "textarea",
      type:"textarea"
    },
    {
      fieldName: "textarea nueco",
      type:"input",
      control: "number"
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
