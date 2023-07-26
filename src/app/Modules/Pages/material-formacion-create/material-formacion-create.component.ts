import { Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExtendModalAlertComponent } from '../../Components/extend-modal-alert/extend-modal-alert.component';
import { ChargeWheelFiller } from 'src/app/shared/models/charge-wheel.model';
import { ExtendModalFiller, incomeData } from 'src/app/shared/models/extend-modal-content';
import { SearchBarService } from 'src/app/shared/services/search-bar.service';
import { MaterialFormacion } from 'src/app/shared/models/material-formacion.model';
import { MaterialFormacionService } from 'src/app/shared/services/material-formacion.service';
import { ExtendModalFormComponent } from '../../Components/extend-modal-form/extend-modal-form.component';
import { RegularChartFiller } from 'src/app/shared/models/regular-chart.model';
import { TableExtendInformationComponent } from '../../Components/table-extend-information/table-extend-information.component';
import { post } from 'jquery';

@Component({
  selector: 'app-material-formacion-create',
  templateUrl: './material-formacion-create.component.html',
  styleUrls: ['./material-formacion-create.component.css']
})
export class MaterialFormacionCreateComponent {

  MF: MaterialFormacion | any;
  MFS: MaterialFormacion[] = [];
  res: any[] = [];
  view: Array<any> = [];
  filler: ExtendModalFiller[]=[];
  item: MaterialFormacion | undefined = {} as MaterialFormacion;
  showAlert:any;
  fileInput:any;

  


  constructor(
    private _MFService: MaterialFormacionService,
    private notificationService: NotificationService,
    private searchService: SearchBarService,
    private modal: MatDialog,

  ){ }

  ngOnInit(): void{

    this.searchService.getModelName('materialformacion', 'materialformaciones');

    this.searchService.$searchArrayService.subscribe((res: any) => {
      this.MF=res;
      this.res=res;

      let view: ChargeWheelFiller[] = res.map((res: any) => ({
        itemId: res.id || "",
        itemName: res.codigoMF,
        itemCode: res.codigoMF,
        itemOne: res.descripcion,
        itemTwo: res.rutaarchivo,
        itemThree:res.file,
        itemEnfasis: res.id,

      }
      ))
      this.view = view;
    })

  }

  Update(id: number){
    const item: MaterialFormacion = this.res.find((res) => res.id === id);

    if(item)
      this.filler = [
        {
          fieldName: 'CodigoMF',
          control: 'String',
          dataPlacer: item.codigoMF,
        },
        {
          fieldName: 'descripcion',
          dataPlacer: item.descripcion,
          uppercase: true,
        },
        {
          fieldName: 'archivo',
          dataPlacer: item.file,
          uppercase: true,
        },
        {
          fieldName: 'ruta',
          dataPlacer: item.rutaarchivo,
          uppercase: true,
        }
      ];
     var pass: incomeData = {
      filler: this.filler,
      title: 'Actualizar descripcion',
    }  
     const dialogRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(
      ExtendModalFormComponent,
      { data: pass }
    );

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.MF = {
          id: this.item?.id,
          codigoMF: res[0],
          descripcion: res[1],
          rutaarchivo: res[2],
          file: res[3], 
        };

        this._MFService.actualizarArea(this.MF);
        this.searchService.getModelName('materialformacion', 'materialformaciones');
        console.log('view', this.view);
      } else {
        this.notificationService.showNotification({
          message: 'Cancelado',
          type: 'fail',
        });
      }
    });

  }

  extendInformation(id: number) {
    let view = (this.res.find(res => res.id === id))
    if (view) {
      let data = { data: view, title: view.nombreArea }
      const modalRef: MatDialogRef<TableExtendInformationComponent> = this.modal.open(TableExtendInformationComponent, { data: data, })
    }
  }

  guardarMFS(MF: MaterialFormacion) {
    this._MFService.enviarMF(MF).subscribe(
      response => {
        console.log(response);
        this.notificationService.showNotification({ message: "MFS guardada", type: "success" });
      },
      error => {
        console.error(error);
        this.notificationService.showNotification({ message: "verifica la estructura de envio ", type: "fail" });
      }
    );
  }

  delete(data: { itemId: number, itemName: string }) {
    this.showAlert("¿Desea borrar : " + data.itemName + "?").then((response: boolean) => {
      if (response) {
        this.searchService.getModelName('materialformacion', 'materialformaciones');
        this._MFService.eliminarMF(data.itemId);
        this.notificationService.showNotification({ message: "Cambios guardados", type: "success" })
      } else { }
    });

  }

  deleteMF(event: number) {
    this._MFService.eliminarMF(event).subscribe(() => {
    });
  }

  dialogConfig = new MatDialogConfig();

  openModalCreate(){

    this.filler = [
      {
        fieldName: 'CodigoMF',
        control: 'String',
        uppercase: true,
      },
      {
        fieldName: 'descripcion',
        control: 'text',
        uppercase: true,
      },
      {
        fieldName: 'ruta',
        control: 'text',
        uppercase: true,
      },
      {
        fieldName: 'file',
        control: 'file',
        uppercase: true,
      }
    ];

    const pass: incomeData = {
      filler: this.filler,
      title: 'Actualizar MF',
    };

    const dialogRef: MatDialogRef<ExtendModalFormComponent> = this.modal.open(
      ExtendModalFormComponent,
      { data: pass }
    );

    dialogRef.afterClosed().subscribe((gets) => {
      console.log('Datos proporcionados por el usuario:', gets);
    
      if (gets) {
        const nuevaMF: MaterialFormacion = {
          codigoMF: gets[0],
          descripcion: gets[1],
          rutaarchivo: gets[2],
          file: gets[3], // Cambiado de 'archivo' a 'file'
        };
        console.log('Nueva MF:', nuevaMF);
    
        this.guardarMFS(nuevaMF);
        this.searchService.getModelName('materialformacion', 'materialformaciones');
        console.log('view', this.view);
      }
    });
 }    







  }












    

    



  

  

  

  



  



  



