import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { get } from "lodash";
import { useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

const ControlledAutocomplete = ({ ...props }) => {
  const {
    name,
    control,
    loading,
    TextFieldProps = {},
    options = [],
    ...rest
  } = props;
  const { t } = useTranslation();
  const controller = useController({ name, control });
  const {
    field,
    fieldState: { error },
  } = controller;

  if (field.value === undefined) {
    console.error(
      `[FTEL-ERROR] : Le composant ControlledAutocomplete '${name}' a une valeur undefined, il faut impérativement donner une valeur par défaut au formulaire (defaultValues)"`
    );
  }

  return (
    <Autocomplete
      options={options}
      {...field}
      onChange={(_, newValue) => field.onChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error && get(error, "message", t("invalid-field"))}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "none",
          }}
          {...TextFieldProps}
        />
      )}
      {...rest}
    />
  );
};

export default ControlledAutocomplete;
