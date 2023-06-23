export interface BoardTableFiller {
    itemData: Array<string>;
    itemId:number;
}

export interface BoardTableFillerTitles {
    itemTitles: Array<string>;
}

export interface BoardTable {
    itemTitles: BoardTableFillerTitles;
    itemData: BoardTableFiller[];
}