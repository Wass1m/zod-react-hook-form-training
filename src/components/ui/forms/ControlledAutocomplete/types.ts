import { SxProps, TextFieldProps } from '@mui/material'
import { ReactNode } from 'react'
import { ControlledComponentProps } from 'types'

export type ControlledAutocompleteProps<T> = {
  loading: boolean
  TextFieldProps: TextFieldProps
  options: T[]
  getOptionLabel: (option: T) => string
  multiple?: boolean
  disabled?: boolean
  sx?: SxProps
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
  ) => ReactNode
  isOptionEqualToValue?: (option: T, value: T) => boolean
  readOnly?: boolean
} & ControlledComponentProps
