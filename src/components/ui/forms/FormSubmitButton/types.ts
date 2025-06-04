import { ButtonProps } from '@mui/material'

export type FormSubmitButtonProps = {
  id?: string
  label: string
  afterReset?: () => void
} & ButtonProps