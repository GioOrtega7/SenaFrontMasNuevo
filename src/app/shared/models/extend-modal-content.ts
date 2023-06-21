export interface ExtendModalFiller {
    fieldName: string;
    placeholder?: string;
    type?: string;
    control?: string;
    formControlName?: string;
    ngModel?: string;
    uppercase?: boolean;
    data?: Array<{ data: string, dataId: number }>;
    dataPlacer?: any;
}

export interface incomeData {
    filler: ExtendModalFiller[],
    title: string,
    incomeId?: string,
    update?: boolean,
    dataArray?: any
}