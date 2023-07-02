export interface ExtendModalFiller {
    fieldName: string;
    placeholder?: string;
    type?: string;
    control?: string;
    formControlName?: string;
    ngModel?: string | number;
    uppercase?: boolean;
    data?: { data: string, dataId: number }[];
    dataPlacer?: any | any[];
    extend?: incomeData
}

export interface incomeData {
    filler: ExtendModalFiller[],
    title: string,
    dataArray?: any
}