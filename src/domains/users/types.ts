import { z } from "zod";

export const UserSchema = () =>
  z
    .object({
      id: z.string().nullish(),
      firstName: z
        .string()
        .min(3, "Minimum 3 caractères")
        .nullable()
        .refine((val) => val !== null, {
          message: "Ce champ est obligatoire",
        }),
      lastName: z
        .string()
        .min(3, "Minimum 3 caractères")
        .nullable()
        .refine((val) => val !== null, {
          message: "Ce champ est obligatoire",
        }),
      fullName: z.string().nullable(),
      email: z
        .string()
        .email("Adresse email invalide")
        .nullable()
        .refine((val) => val !== null, {
          message: "Ce champ est obligatoire",
        }),
      isPasswordEditable: z.boolean().optional(),
      password: z.string().nullable(),
      passwordCopy: z.string().nullable(),
    })
    .superRefine((val, ctx) => {
      if (val.isPasswordEditable) {
        if (!val.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Ce champ est obligatoire",
            path: ["password"],
          });
        } else if (val.password && val.password.length < 3) {
          ctx.addIssue({
            code: z.ZodIssueCode.too_small,
            minimum: 3,
            type: "string",
            inclusive: true,
            message: "Minimum 3 caractères",
            path: ["password"],
          });
        }

        if (val.password !== val.passwordCopy) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Les mots de passe ne sont pas identiques",
            path: ["passwordCopy"],
          });
        }
      }
    });

export type User = z.infer<ReturnType<typeof UserSchema>>;

export type AuthUser = User & {
  defaultCultureKey?: "fr";
};
