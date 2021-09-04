import React from 'react'

import { Container } from './styles'
import Column from './Column'
import Card from './Card'

export default function Home() {
  return (
    <Container>
      <Column title="To Do">
        <Card text="Generate app scaffold" />
      </Column>
      <Column title="In Progress">
        <Card text="Learn Typescript" />
      </Column>
      <Column title="Done">
        <Card text="Begin to use static typing" />
      </Column>
    </Container>
  )
}
