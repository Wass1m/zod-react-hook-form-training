// types.ts
import type { TextFieldProps } from '@mui/material'
import type { Control, FieldValues, Path } from 'react-hook-form'

export type ControlledTextFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>
  control?: Control<T> | null
  shrink?: boolean
  textFieldProps?: Partial<TextFieldProps>
} & Omit<TextFieldProps, 'name'> // avoid conflicting 'name'
