import { Button } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { defaultAfterReset } from "./enums";
import { FormSubmitButtonProps } from "./types";

function FormSubmitButton({
  id = "",
  label,
  afterReset = defaultAfterReset,
  ...buttonProps
}: FormSubmitButtonProps) {
  const {
    formState: { isSubmitting, isSubmitSuccessful },
    reset,
  } = useFormContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      if (afterReset) {
        afterReset();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <Button
      id={id}
      variant="contained"
      color="primary"
      type="submit"
      disabled={isSubmitting}
      {...buttonProps}
    >
      {label}
    </Button>
  );
}

export default FormSubmitButton;
