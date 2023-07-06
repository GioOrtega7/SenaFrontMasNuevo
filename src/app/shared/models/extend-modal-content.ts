export interface ExtendModalFiller {
    fieldName: string;
    placeholder?: string;
    type?: string;
    control?: string;
    formControlName?: string;
    ngModel?: string | number;
    uppercase?: boolean;
    data?: { data: string, dataId: number }[];
    dataPlacer?:{dataId: number | string}[] |  any  ;
    extend?: incomeData
    display?:  {inc? :number ,id?: number,data :{title: string, desc: string}[]}[]
}

export interface incomeData {
    filler: ExtendModalFiller[],
    title: string,
    dataArray?: any
}