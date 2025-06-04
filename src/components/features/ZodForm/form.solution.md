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
firstName: "",
lastName: "",
email: "",
isPasswordEditable: isEmpty(userId),
fullName: "",
};

const schema = UserSchema();

const form = useForm<User>({
defaultValues,
resolver: zodResolver(schema),
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
