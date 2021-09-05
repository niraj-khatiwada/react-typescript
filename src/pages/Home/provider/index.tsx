import React from 'react'

import reducer, {
  INITIAL_STATE,
  SetColumnAction,
  SetColumnItemAction,
  State,
} from '../reducer'

export const StateProvider = React.createContext<State>(
  JSON.parse(JSON.stringify(INITIAL_STATE))
)

export const DispatchProvider = React.createContext<React.Dispatch<
  SetColumnAction | SetColumnItemAction
> | null>(null)

export default function Provider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

  return (
    <StateProvider.Provider value={state}>
      <DispatchProvider.Provider value={dispatch}>
        {children}
      </DispatchProvider.Provider>
    </StateProvider.Provider>
  )
}

export function withTaskProvider(WrappedComponent: React.FunctionComponent) {
  return (...props: any) => (
    <Provider>
      <WrappedComponent {...props} />
    </Provider>
  )
}

export function useTaskState() {
  const state = React.useContext(StateProvider)
  if (!state) {
    throw new Error('Task State Provider out of context')
  }

  return state
}

export function useTaskDispatch() {
  const dispatch = React.useContext(DispatchProvider)
  if (!dispatch) {
    throw new Error('Task Dispatch Provider out of context')
  }

  return dispatch
}

interface ProviderProps {
  children: React.ReactNode
}
