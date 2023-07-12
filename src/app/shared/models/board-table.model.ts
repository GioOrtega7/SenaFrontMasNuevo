export interface BoardTableFiller {
    itemData: Array<string>;
    itemId:number;
    updateHidden?: boolean,
    deleteHidden?: boolean,
    infoHidden?: boolean,
    showChecks?: boolean
}
export interface BoardTable {
    itemTitles: Array<string>;
    itemData: BoardTableFiller[];
}
