
export interface IColumn {
    label: string
    accepts: string[]
    items: IDateItem[]
    itemType: string
}

export interface IDateItem {
    id: string
    date: Date
    type: string
}