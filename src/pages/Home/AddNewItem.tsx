import React from 'react'

import {
  AddItemButton,
  NewItemFormContainer,
  NewItemInput,
  NewItemButton,
} from './styles'

export default function AddNewItem({ dark = true, onSubmit }: AddNewItemProps) {
  const [isAddInitialized, setIsAddInitialized] = React.useState<boolean>(false)

  const handleAddInitialization = () => {
    setIsAddInitialized(true)
  }

  return !isAddInitialized ? (
    <AddItemButton dark={dark} onClick={handleAddInitialization}>
      + Add new item
    </AddItemButton>
  ) : (
    <NewItemForm
      isAddInitialized={isAddInitialized}
      setIsAddInitialized={setIsAddInitialized}
      onSubmit={(text) => {
        onSubmit(text)
        setIsAddInitialized(false)
      }}
    />
  )
}

function NewItemForm({
  isAddInitialized,
  setIsAddInitialized,
  onSubmit,
}: NewItemFormProps) {
  const [text, setText] = React.useState<string>('')

  const addContainerRef = React.useRef<HTMLFormElement | null>(null)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (isAddInitialized && addContainerRef.current) {
      inputRef.current?.focus()
      window.addEventListener('click', handleClickEvent)
    } else {
      window.removeEventListener('click', handleClickEvent)
    }

    return () => {
      window.removeEventListener('click', handleClickEvent)
    }

    function handleClickEvent(evt: MouseEvent) {
      if (!addContainerRef.current?.contains(evt.target as any)) {
        setIsAddInitialized(false)
      }
    }
  }, [isAddInitialized])

  const handleTextChange = function (evt: React.ChangeEvent<HTMLInputElement>) {
    setText(evt.target.value)
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    onSubmit(text)
  }

  return (
    <NewItemFormContainer ref={addContainerRef} onSubmit={handleSubmit}>
      <NewItemInput
        placeholder="Type something..."
        ref={inputRef}
        value={text}
        onChange={handleTextChange}
      />
      <NewItemButton type="submit">Add</NewItemButton>
    </NewItemFormContainer>
  )
}

interface AddNewItemProps {
  dark?: boolean
  onSubmit: (text: string) => void
}

interface NewItemFormProps {
  isAddInitialized: boolean
  setIsAddInitialized: (type: boolean) => void
  onSubmit: (text: string) => void
}
