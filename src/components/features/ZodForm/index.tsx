import { Grid } from "@mui/material";
import isEmpty from "lodash/isEmpty";
import { FormProvider, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import useYupForm from "./form";
import ControlledTextField from "../../ui/forms/ControlledTextField";
import ControlledCheckbox from "../../ui/forms/ControlledCheckbox";
import FormSubmitButton from "../../ui/forms/FormSubmitButton";
import AnimatedOverlay from "../../ui/Animated";

function ZodForm({ userId = null }) {
  const { form, onSubmit } = useYupForm(userId);
  const isPasswordEditable = useWatch({
    control: form.control,
    name: "isPasswordEditable",
  });
  const { handleSubmit } = form;
  const isCreation = isEmpty(userId);
  const { t } = useTranslation();

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
            <ControlledTextField name="email" label={t("email")} fullWidth />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              name="firstName"
              label={t("firstname")}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <ControlledTextField
              name="lastName"
              label={t("lastname")}
              fullWidth
            />
          </Grid>

          {isCreation ? (
            <>
              <Grid size={{ xs: 12, md: 6 }}>
                <ControlledTextField
                  name="password"
                  type="password"
                  label={t("password")}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ControlledTextField
                  name="passwordCopy"
                  type="password"
                  label={t("password-confirmation")}
                  fullWidth
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid size={{ xs: 12 }}>
                <ControlledCheckbox
                  name="isPasswordEditable"
                  label={t("edit-password")}
                />
              </Grid>
              {isPasswordEditable && (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <ControlledTextField
                      name="password"
                      type="password"
                      label={t("password")}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <ControlledTextField
                      name="passwordCopy"
                      type="password"
                      label={t("password-confirmation")}
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
              label={isCreation ? t("create") : t("save")}
            />
          </Grid>
        </Grid>
      </FormProvider>
    </AnimatedOverlay>
  );
}

export default ZodForm;
