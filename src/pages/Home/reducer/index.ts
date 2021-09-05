import { ColumnItem } from './action'

export const INITIAL_STATE: State = {
  columns: [],
}

function reducer(
  state: State = INITIAL_STATE,
  action: SetColumnAction | SetColumnItemAction
): State {
  switch (action.type) {
    case 'SET_COLUMN':
      return {
        ...state,
        columns: [
          ...state.columns,
          { id: state.columns.length, title: action.payload, items: [] },
        ],
      }
    case 'SET_COLUMN_ITEM':
      const targetColumnId = action.payload.columnId
      const findColumn = state.columns.find(
        (column) => column.id == targetColumnId
      )
      if (!findColumn) {
        return state
      }
      const remainingItems = state.columns.filter(
        (column) => column.id !== targetColumnId
      )

      return {
        ...state,
        columns: [
          ...remainingItems,
          {
            ...findColumn,
            items: [
              ...findColumn.items,
              { id: findColumn.items.length, title: action.payload.text },
            ],
          },
        ],
      }
    default:
      return state
  }
}

export interface SetColumnAction {
  type: 'SET_COLUMN'
  payload: string
}

export interface SetColumnItemAction {
  type: 'SET_COLUMN_ITEM'
  payload: ColumnItem
}

interface Item {
  id: number
  title: string
}

export interface Column {
  id: number
  title: string
  items: Array<Item>
}

export interface State {
  columns: Array<Column>
}

export default reducer
