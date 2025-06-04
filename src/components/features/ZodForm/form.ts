import { zodResolver } from "@hookform/resolvers/zod";

import isEmpty from "lodash/isEmpty";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SUCCESS, useSnackbar } from "../../../contexts/SnackbarContext";
import { User, UserSchema } from "../../../domains/users/types";

function useZodForm(userId: string | null = null) {
  const { t } = useTranslation();
  const { popSnackbar } = useSnackbar();

  const isCreation = isEmpty(userId);

  const defaultValues = {
    id: null,
    password: "",
    passwordCopy: "",
    firstName: "ask",
    lastName: "ftel",
    email: "ask@ftel.fr",
    isPasswordEditable: isEmpty(userId),
    fullName: "",
  };

  const form = useForm<User>({
    defaultValues,
    resolver: zodResolver(UserSchema),
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
