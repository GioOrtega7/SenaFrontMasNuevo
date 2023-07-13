import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewChecked, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { AreaModel } from 'src/app/shared/models/area.model';
import { AreaService } from 'src/app/shared/services/area.service';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';
import 'slick-carousel';
import { IconChartSoleComponent } from 'src/app/Modules/Components/icon-chart-sole/icon-chart-sole.component';
import { ExtendModalFormComponent } from '../../../Components/extend-modal-form/extend-modal-form.component';
import { MatDialogConfig } from '@angular/material/dialog';
import { AreasModalComponent } from '../areas-modal/areas-modal.component';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { IconChartFiller } from 'src/app/shared/models/icon-chart.model';
import { ExtendModalAlertComponent } from 'src/app/Modules/Components/extend-modal-alert/extend-modal-alert.component';
import { BoardTable, BoardTableFiller } from 'src/app/shared/models/board-table.model';
import { TableExtendInformationComponent } from 'src/app/Modules/Components/table-extend-information/table-extend-information.component';
import { ExtendModalSecondService } from 'src/app/shared/services/extend-modal-second.service';
import { EmptyExpr } from '@angular/compiler';
import { BoardFiller } from 'src/app/shared/models/board.model';
import { DescriptionFiller } from 'src/app/shared/models/description.model';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit, OnDestroy {


  protected cache: Map<number, { areas: AreaModel[] | null }> = new Map<number, { areas: AreaModel[] | null }>();
  protected showFormArea: boolean = false;
  protected formTitle: string = "";
  protected showResultadoBusqueda: boolean = false;
  protected resultadoBusqueda: AreaModel | null = null;
  displayet: AreaModel[] = []
  searchTerm: string = '';
  res1: any[] = []
  area: AreaModel | null = null;
  view: Array<any> = [];
  soleView: IconChartFiller = {} as IconChartFiller
  private subscription: Subscription | undefined;
  filler: ExtendModalFiller[] = [];
  filler1: ExtendModalFiller[] = [];
  tableView: BoardTable = {} as BoardTable;
  boardView: BoardFiller = {} as BoardFiller
  data: any[] = []
  description: DescriptionFiller = {} as DescriptionFiller
  constructor(
    private saveData: ExtendModalSecondService,
    //private dialogRef: MatDialogRef<AreasComponent>,
    //private modalRef: MatDialogRef<ExtendModalComponent>,
    private searchService: SearchBarService,
    private modal: MatDialog,
    private notificationService: NotificationService,
    private _areaService: AreaService,
  ) { }



  ngOnInit() {



    this.searchService.getModelName("area", "areas")

    this.searchService.$searchArrayService.subscribe((res: any) => {
      this.res1 = res;
      let view: IconChartFiller[] = res.map((res: AreaModel) => ({
        itemId: res.id || "",
        iconUrl: res.iconUrl,
        itemName: res.nombreArea,
        itemCode: res.codigo,
        itemOne: res.codigo,
        itemTwo: "",
        itemThree: res.nombreArea,
        itemEnfasis: res.id,
        itemMessage: "Horas",
        itemFour: "asdas",
 
      }))

      this.boardView ={
        itemId: res[0].id,
        data: [{itemTitle:"Nombre de area de daqwe dasdasd qweqweq ", itemData: res[0].nombreArea },{itemTitle:"Nombre de area de daqwe dasdasd qweqweq ", itemData: res[0].nombreArea },{itemTitle:"Nombre de area de daqwe dasdasd qweqweq ", itemData: res[0].nombreArea },{itemTitle:"Nombre de area de daqwe dasdasd qweqweq ", itemData: res[0].nombreArea },{itemTitle:"Nombre de area de daqwe dasdasd qweqweq ", itemData: res[0].nombreArea },{itemTitle:"Nombre de area de daqwe dasdasd qweqweq ", itemData: res[0].nombreArea },{itemTitle:"Nombre de area", itemData: res[0].nombreArea },{itemTitle:"Nombre de area de daqwe dasdasd qweqweq ", itemData: res[0].nombreArea },{itemTitle:"Nombre de area", itemData: res[0].nombreArea }]
      }
      
      let as = new Date(2022, 1, 10);
      let titles = ["ID", "Nombre de area", "Nombre de area", "Nombre de area", "Nombre de area", "Nombre de area", "Nombre de area", "Nombre de area", "Nombre de area"]
      let tableView: BoardTableFiller[] = res.map((res: AreaModel) => ({
        itemData: [res.id, res.nombreArea, res.iconUrl, res.nombreArea, res.nombreArea, res.iconUrl, res.iconUrl, res.iconUrl, res.iconUrl],
        itemId: res.id,
        deleteHidden: true,
        showChecks: true
      }))
      this.tableView = { itemTitles: titles, itemData: tableView }
      this.view = view;
      this.soleView = view[1]
      this.data = res.map((res: AreaModel) => ({
        data: res.nombreArea,
        dataId: res.id
      }))

    });

    this.description = {
      itemTitle: "Titulo",
      itemTitleOne: "asd",
      itemMesgOne: "asdas",
      itemTitleTwo: "asdas",
      itemMesgTwo: "asdas",
      itemTitleThree: "asdas",
      itemMesgThree: "asdas",
      itemDescription: "asdas",
    }
  }

  Update(id: number) {

    const data: AreaModel = this.res1.find(res => res.id === id)

    if (data)
      this.filler = [{
        fieldName: "Nombre de Area",
        type: "input",
        control: "text",
        dataPlacer: data.nombreArea,
        uppercase: true
      }
        , {
        fieldName: "Codigo",
        control: "number",
        dataPlacer: data.codigo
      },
      {
        fieldName: "Icono asdasd asd aqwe ",
        control: "string",
        dataPlacer: data.iconUrl
      }
      ]

    var pass: incomeData = {
      filler: this.filler, title: "Actualizar area"
    }

    const dialogRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent, { data: pass })


    dialogRef.afterClosed().subscribe(gets => {
      if (gets) {
        this.area = {
          id: id,
          nombreArea: gets[0],
          codigo: gets[1]
        }
        this.guardarArea(this.area)
        this.searchService.getModelName("area", "areas")
        
      }
    })
  }


  async showAlert(alert: string): Promise<boolean> {
    const dialogRef: MatDialogRef<ExtendModalAlertComponent> = this.modal.open(ExtendModalAlertComponent, { data: alert });

    return await dialogRef.afterClosed().toPromise();
  } 

  Delete(data: { itemId: number, itemName: string }) {

    this.showAlert("¿Desea borrar : " + data.itemName + "?").then((response: boolean) => {
      if (response) {
        this.deleteArea(data.itemId);
        this.searchService.getModelName("area", "areas");
        this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })

      }
    });


  }

  guardarArea(area: AreaModel) {

    this.notificationService.showNotification({ message: "Cambios guardakdos", type: "success" })

    if (area.id) {
      this._areaService.actualizarArea(area).subscribe(() => {


      });
    } else {
      this._areaService.guardarArea(area).subscribe(() => {


      });
    }
  }


  extendInformation(id: number) {
    let view = (this.res1.find(res => res.id === id))
    if (view) {
      let data = { data: view, title: view.nombreArea }
      const modalRef: MatDialogRef<TableExtendInformationComponent> = this.modal.open(TableExtendInformationComponent, { data: data, })
    }
  }

  iniciarCache() {
    this.cache.set(0, { areas: null });
  }




  deleteArea(event: number) {
    this._areaService.borrarArea(event).subscribe(() => {
    })
  }
  ///////////////////////////////

  dialogConfig = new MatDialogConfig();


  openModalCreate() {


    this.filler = [{
      fieldName: "Nombre de Area",
      control: "text",
      uppercase: true,
      dataPlacer: "asd"
    }
      , {
      fieldName: "Codigo",
      control: "timestamp",
      dataPlacer:{start: new Date(2023,10,3), end: new Date(2023,10,3)}
    },
    {
      fieldName: "Icono",
      control: "date",
      dataPlacer: new Date(2023,10,3)
    },
    {
      fieldName: "Select 2",
      type: "select",
      data: this.data,
      dataPlacer: 6,
    },
    {
      fieldName: "Select",
      type: "select",
      data: this.data,
      dataPlacer: this.data[2].dataId
    },
    {
      fieldName: "Text area",
      type: "textarea",
      dataPlacer: "6123123"
    },

    ]

    var pass1: incomeData = {
      filler: this.filler, title: "Actualizar area"
    }



    this.filler1 = [{
      fieldName: "Nombre de Area",
      control: "text",
      uppercase: true,
      dataPlacer: "asd"
    }
      , {
      fieldName: "Check",
      type: "checkbox",
      data: [{ data: "uno", dataId: 1 },
      { data: "dos", dataId: 2 },
      { data: "tres", dataId: 3 },
      { data: "cuatro", dataId: 4 }],
      dataPlacer:
        [{ dataId: 1 },
        { dataId: 2 },
        { dataId: 31 },
        { dataId: 6 },]
    },
    {
      fieldName: "Icono",
      type: "timestamp",
      control: "time",
     },
     {
      fieldName: "Icono2",
      type: "timestamp",
      control: "date",
      dataPlacer:{start: "2023-07-11", end: new Date(2023,10,3)}
     },
    {
      fieldName: "Icono3",
      control: "date",
      dataPlacer: new Date(2023,10,3)
    },
    {
      fieldName: "Area",
      type: "select",
      data: this.data,
      extend: pass1
    },
    {
      fieldName: "Area extra",
      type: "select",
      data: this.data,
      dataPlacer: "4"

    },
    {
      fieldName: "Mostrar",
      type: "display",
      dataPlacer: "6123123",
      display: [ {id:2, data:[{title:"a", desc:"a"}]}
      ],
       
      extend: pass1
    },
    {
      fieldName: "Text area",
      type: "textarea",
      dataPlacer: "6123123"
    },


    ]

    var pass: incomeData = {
      filler: this.filler1, title: "Actualizar area"
    }
    var id1 : number = 0;
    const dialogRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(ExtendModalFormComponent, { data: pass })
    this.saveData.$extendModalSecondSave.subscribe((res: any) => {
      var display = {}
      
      var area: AreaModel
      var name: string = res.name;
      var newArea: any[]
      if (res.data) {

        area = {
          nombreArea: res.data[0],
          codigo: res.data[1],
          iconUrl: res.data[2]
        }

        this.guardarArea(area)
        this.searchService.getModelName(" ", "areas");
        id1= id1+1;        
        var id: number = 1;
        this.searchService.$searchArrayService.subscribe((res) => {
          if (res) {
            
            newArea = res.map(res => ({ data: res.nombreArea, dataId: res.id }));
            display =  {id: id , data:[{title: "Area añadida", desc: area.nombreArea}]}
            id = id +1;
            this.saveData.dataUpdate(newArea, name)
            this.saveData.displayUpdate(display, "Mostrar");            
          }
        }
        )
      }
    })

    dialogRef.afterClosed().subscribe(gets => {

      if (gets) {
        this.area = {
          nombreArea: gets[0],
          codigo: "asd",
          iconUrl: gets[2]
        }        
        this.guardarArea(this.area)
      }
    })
  }
  /////////////////////////////////////////////

  buscarArea(event: AreaModel) {
    this.showResultadoBusqueda = true;
    this.resultadoBusqueda = event;
  }




  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



  ngAfterViewChecked(): void {

  }
}