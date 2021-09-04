import React from 'react'

import { ColumnContainer, ColumnTitle } from './styles'

interface Props {
  title: string
  children?: React.ReactNode
}

function Column({ title = '', children }: Props) {
  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      {children}
    </ColumnContainer>
  )
}

export default Column
