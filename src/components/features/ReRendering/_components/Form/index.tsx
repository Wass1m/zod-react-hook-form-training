import { Grid } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { useFormContext } from "react-hook-form";

import AnimatedOverlay from "../../../../ui/Animated";
import ControlledCheckbox from "../../../../ui/forms/ControlledCheckbox";
import ControlledTextField from "../../../../ui/forms/ControlledTextField";
import FormSubmitButton from "../../../../ui/forms/FormSubmitButton";
import useReRenderingForm from "./form";
import { useFirstName } from "../../context/reRenderContext";
import { useEffect } from "react";

function ReRenderingForm({ userId = "123456789" }) {
  const form = useFormContext();
  const allValues = form.watch();
  const { onSubmit } = useReRenderingForm();
  const { setFirstName } = useFirstName();

  const isPasswordEditable = form.watch("isPasswordEditable");
  const firstName = form.watch("firstName");

  const { handleSubmit } = form;
  const isCreation = isEmpty(userId);

  console.log(allValues);

  useEffect(() => {
    if (firstName) {
      setFirstName(firstName);
    }
  }, [firstName, setFirstName]);

  return (
    <AnimatedOverlay>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid size={{ xs: 12 }}>
          <ControlledTextField name="email" label="Email" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField name="firstName" label="Prénom" fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ControlledTextField name="lastName" label="Nom" fullWidth />
        </Grid>

        {isCreation ? (
          <>
            <Grid size={{ xs: 12, md: 6 }}>
              <ControlledTextField
                name="password"
                type="password"
                label="Mot de passe"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ControlledTextField
                name="passwordCopy"
                type="password"
                label="Confirmation du mot de passe"
                fullWidth
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={{ xs: 12 }}>
              <ControlledCheckbox
                name="isPasswordEditable"
                label="Modifier le mot de passe"
              />
            </Grid>
            {isPasswordEditable && (
              <>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ControlledTextField
                    name="password"
                    type="password"
                    label="Mot de passe"
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ControlledTextField
                    name="passwordCopy"
                    type="password"
                    label="Confirmation du mot de passe"
                    fullWidth
                  />
                </Grid>
              </>
            )}
          </>
        )}
        <Grid size={{ xs: 12 }} sx={{ textAlign: "center" }}>
          <FormSubmitButton
            id="ftsl-submit-button"
            label={isCreation ? "Créer" : "Enregistrer"}
          />
        </Grid>
      </Grid>
    </AnimatedOverlay>
  );
}

export default ReRenderingForm;
