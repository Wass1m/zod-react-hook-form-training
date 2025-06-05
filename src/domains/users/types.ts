// 🧪 EXERCICE ZOD – Création d’un schéma de validation utilisateur

// Objectif : créer un schéma Zod `UserSchema` avec champs obligatoires, validations conditionnelles,
// et messages d’erreurs personnalisés en français.

// 📦 Prérequis : assurez-vous que Zod est installé dans le projet
// npm install zod

// ✅ TODO - Étapes à suivre :

// 🟠 Étape 1 – Préparation
// - Créer un fichier userSchema.ts
// - Importer `z` depuis "zod"
import { z } from "zod";

// ✅ ZOD - refine()
// -------------------------------------------------
// ➤ refine permet d’ajouter une règle personnalisée sur un champ **individuel**.
// Elle est appelée avec la valeur du champ et doit retourner true/false.
// Elle prend aussi un message à afficher en cas d’échec.
//
// Exemples d’usage :
// - Empêcher les valeurs nulles même si le champ est nullable
// - Valider un champ avec une expression régulière
//
// Syntaxe :
// z.string().nullable().refine((val) => val !== null, { message: "Ce champ est obligatoire" })

// ✅ ZOD - superRefine()
// -------------------------------------------------
// ➤ superRefine permet de faire des validations **multi-champs** ou **conditionnelles**
// sur l’objet entier. On peut utiliser ctx.addIssue pour ajouter une ou plusieurs erreurs.
//
// Exemples d’usage :
// - Comparer deux champs (ex : password === passwordCopy)
// - Valider un champ uniquement si un autre champ a une certaine valeur

// Syntaxe :
// .superRefine((data, ctx) => {
// if (data.condition && !data.otherField) {
// ctx.addIssue({ path: ['otherField'], message: "Erreur", code: z.ZodIssueCode.custom })
// }
// })

// 🟡 Étape 2 – Champs de base
// - Définir un objet Zod avec :
// - id : string nullable
// - firstName : string, min 3 caractères, obligatoire (non null)
// - lastName : string, min 3 caractères, obligatoire (non null)
// - fullName : string nullable
// - email : string, email valide, obligatoire (non null)

export const UserSchema = z
  .object({
    id: z.string().nullish(), // valeur ,undefined (etre ommis), null

    // firstName : minimum 3 caractères, non null, avec refine pour vérifier non null
    firstName: z
      .string()
      .min(3, "Minimum 3 caractères")
      .refine((val) => val !== null, {
        message: "Ce champ est obligatoire",
      }),

    // lastName : minimum 3 caractères, non null à valider dans le string object
    lastName: z
      .string({
        required_error: "Ce champ est obligatoire",
      })
      .min(3, "Minimum 3 caractères"),

    // fullName : string nullable
    fullName: z.string().nullable(),

    // email : format email valide, non null
    email: z
      .string()
      .email("Adresse email invalide")

      .refine((val) => val !== null, {
        message: "Ce champ est obligatoire",
      }),

    // 🟢 Étape 3 – Champs liés au mot de passe
    // - isPasswordEditable : booléen optionnel
    // - password : string nullable
    // - passwordCopy : string nullable
    isPasswordEditable: z.boolean().optional(),
    password: z.string().nullable(),
    passwordCopy: z.string().nullable(),
  })

  // 🔵 Étape 4 – Validation conditionnelle avec superRefine
  // - Si isPasswordEditable est true :
  //   - password est requis
  //   - password doit faire minimum 3 caractères
  //   - password doit être égal à passwordCopy
  .superRefine((val, ctx) => {
    if (val.isPasswordEditable) {
      if (!val.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Ce champ est obligatoire",
          path: ["password"],
        });
      } else if (val.password.length < 3) {
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

// 🟣 Étape 5 – Export des types
// - Exporter le type User depuis le schéma
// - Définir un type AuthUser qui hérite de User avec une propriété defaultCultureKey facultative

export type User = z.infer<typeof UserSchema>;

export type AuthUser = User & {
  defaultCultureKey?: "fr";
};
