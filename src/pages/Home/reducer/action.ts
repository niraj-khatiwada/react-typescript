import { SetColumnAction, SetColumnItemAction } from './index'

export function setColumn(payload: string): SetColumnAction {
  return {
    type: 'SET_COLUMN',
    payload,
  }
}

export function setColumnItem(payload: ColumnItem): SetColumnItemAction {
  return {
    type: 'SET_COLUMN_ITEM',
    payload,
  }
}

export interface ColumnItem {
  columnId: number
  text: string
}
