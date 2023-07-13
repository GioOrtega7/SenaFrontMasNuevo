export interface BoardFiller {
    itemId: number,
    data:{itemTitle: string, itemData: string}[]
    updateHidden?: boolean,
    deleteHidden?: boolean,

}
