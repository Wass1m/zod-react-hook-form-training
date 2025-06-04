import { Grid } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { FormProvider, useWatch } from "react-hook-form";

import AnimatedOverlay from "../../ui/Animated";
import ControlledCheckbox from "../../ui/forms/ControlledCheckbox";
import ControlledTextField from "../../ui/forms/ControlledTextField";
import FormSubmitButton from "../../ui/forms/FormSubmitButton";
import useDecompositionForm from "./form";

function DecompositionForm({ userId = null }) {
  const { form, onSubmit } = useDecompositionForm(userId);
  const isPasswordEditable = useWatch({
    control: form.control,
    name: "isPasswordEditable",
  });
  const { handleSubmit } = form;
  const isCreation = isEmpty(userId);

  return (
    <AnimatedOverlay>
      <FormProvider {...form}>
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
      </FormProvider>
    </AnimatedOverlay>
  );
}

export default DecompositionForm;
