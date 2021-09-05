import React from 'react'

import { Container } from './styles'
import Column from './Column'
import Card from './Card'
import AddNewItem from './AddNewItem'
import { setColumn, setColumnItem } from './reducer/action'
import { withTaskProvider, useTaskState, useTaskDispatch } from './provider'

function Home() {
  const state = useTaskState()

  return (
    <Container>
      {state.columns.map((column) => (
        <Column title={column.title} key={column.id}>
          {column.items.map((item) => (
            <Card key={item.id} text={item.title} />
          ))}
          <NewCard columnId={column.id} />
        </Column>
      ))}
      <NewItem />
    </Container>
  )
}

function NewCard({ columnId }: NewCardItemProps) {
  const dispatch = useTaskDispatch()

  const handleSubmit = (text: string) => {
    dispatch(
      setColumnItem({
        text,
        columnId,
      })
    )
  }
  return <AddNewItem onSubmit={handleSubmit} />
}

function NewItem() {
  const dispatch = useTaskDispatch()

  const handleSubmit = (text: string) => {
    dispatch(setColumn(text))
  }

  return <AddNewItem dark={false} onSubmit={handleSubmit} />
}

interface NewCardItemProps {
  columnId: number
}

export default withTaskProvider(Home)
