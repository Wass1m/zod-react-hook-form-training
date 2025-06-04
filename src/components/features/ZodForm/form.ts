import { yupResolver } from "@hookform/resolvers/yup";
import isEmpty from "lodash/isEmpty";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { SUCCESS, useSnackbar } from "../../../contexts/SnackbarContext";

function useZodForm(userId: string | null = null) {
  const { t } = useTranslation();
  const { popSnackbar } = useSnackbar();

  const isCreation = isEmpty(userId);

  const defaultValues = {
    role: null,
    password: "",
    passwordCopy: "",
    firstName: "",
    lastName: "",
    email: "",
    isPasswordEditable: isEmpty(userId),
  };

  // TODO : Enlever le schema Yup
  const validationSchema = Yup.object().shape({
    isPasswordEditable: Yup.boolean(),
    password: Yup.string().when("isPasswordEditable", {
      is: true,
      then: (schema) =>
        schema.min(3, t("min-3-char")).required(t("required-field")),
      otherwise: (schema) => schema.nullable(),
    }),
    passwordCopy: Yup.string()
      .nullable()
      .when("isPasswordEditable", {
        is: true,
        then: (schema) =>
          schema.oneOf(
            [Yup.ref("password"), null],
            t("password-not-identical")
          ),
        otherwise: (schema) => schema.nullable(),
      }),
    firstName: Yup.string()
      .min(3, t("min-3-char"))
      .required(t("required-field")),
    lastName: Yup.string()
      .min(3, t("min-3-char"))
      .required(t("required-field")),
    email: Yup.string().email(t("invalid-email")).required(t("required-field")),
  });

  // TODO: Rempalcer le yup resolver avec le zod resolver avec le schema Zod, le any par votre User
  const form = useForm<any>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values: any) => {
    try {
      if (isCreation) {
        popSnackbar(t("user-create-success"), SUCCESS);
      } else {
        popSnackbar(t("user-update-success"), SUCCESS);
      }
    } catch {
      form.reset(values);
    }
  };

  return {
    onSubmit,
    form,
  };
}

export default useZodForm;
