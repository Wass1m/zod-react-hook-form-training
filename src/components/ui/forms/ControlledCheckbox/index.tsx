import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import get from "lodash/get";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ControlledCheckboxProps } from "./types";

function ControlledCheckbox({
  name,
  control,
  label = "",
  ...props
}: ControlledCheckboxProps) {
  const { t } = useTranslation();
  const controller = useController({ name, control });
  const {
    field: { value, ...field },
    fieldState: { error },
  } = controller;

  if (value === undefined) {
    console.error(
      `[FTEL-ERROR] : Le composant ControlledCheckbox '${name}' a une valeur undefined, il faut impérativement donner une valeur par défaut au formulaire (defaultValues)"`
    );
  }

  return (
    <FormControl {...props} error={!!error}>
      <FormControlLabel
        control={<Checkbox checked={value} {...field} />}
        label={label}
      />
      {error && (
        <FormHelperText>
          {get(error, "message", t("invalid-field"))}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default ControlledCheckbox;
