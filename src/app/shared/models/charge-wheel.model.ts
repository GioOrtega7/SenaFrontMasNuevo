export interface ChargeWheelFiller {
    itemId: number,
    itemName: string,
    itemCode?:string,
    itemOne: string,
    itemTwo?: string,
    itemThree?: string,
    itemFechainicio:Date,
    itemFechafin:Date,
    itemPercentaje?:number
    updateHidden?: boolean,
    deleteHidden?: boolean,
    infoHidden?: boolean
}
