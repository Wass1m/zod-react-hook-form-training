// ControlledTextField.tsx
import { TextField } from '@mui/material'
import get from 'lodash/get'
import type { FieldValues } from 'react-hook-form'
import { useController, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { ControlledTextFieldProps } from './types'

function ControlledTextField<T extends FieldValues = FieldValues>({
  name,
  control: controlFromProps = null,
  shrink = false,
  type,
  textFieldProps = {},
  ...rest
}: ControlledTextFieldProps<T>) {
  const { t } = useTranslation()
  const formContext = useFormContext<T>()
  const controlFromContext = get(formContext, 'control')
  const controller = useController({
    name,
    control: controlFromProps || controlFromContext,
  })

  const {
    field: { ref: fieldRef, ...fieldRest },
    fieldState: { error },
  } = controller

  if (fieldRest.value === undefined) {
    console.error(
      `[FTEL-ERROR] : Le composant ControlledTextField '${name}' a une valeur undefined, il faut impérativement donner une valeur par défaut au formulaire (defaultValues)`,
    )
  }

  const defaultValue = type === 'number' ? 0 : ''

  return (
    <TextField
      {...fieldRest}
      {...textFieldProps}
      {...rest}
      inputRef={fieldRef}
      size="small"
      type={type}
      error={!!error}
      value={fieldRest.value ?? defaultValue}
      slotProps={{
        ...textFieldProps?.slotProps,
        inputLabel: {
          shrink: shrink || `${fieldRest.value}`.length > 0,
          ...(textFieldProps?.slotProps?.inputLabel || {}),
        },
      }}
      helperText={error && get(error, 'message', t('invalid-field'))}
    />
  )
}

export default ControlledTextField
