import { Field } from 'ui/Field'
import { Input } from 'ui/Input'
import { Button } from 'ui/Button'
import { useState } from 'react'

interface SearchProps {
  placeholder: string | undefined
  handleChange: (value: string) => void
  handleResetClick: () => void
}

export const Search = ({ placeholder, handleChange, handleResetClick }: SearchProps) => {
  const [value, setValue] = useState('')

  const onButtonClick = () => {
    setValue('')
    handleResetClick()
  }

  const onChange = (newValue: string) => {
    setValue(newValue)
    handleChange(newValue)
  }

  return (
    <Field orientation={'horizontal'}>
      <Input value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
      <Button onClick={onButtonClick}>Reset</Button>
    </Field>
  )
}
