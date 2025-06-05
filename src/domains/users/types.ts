// 🧪 EXERCICE ZOD – Création d’un schéma de validation utilisateur

// Objectif : créer un schéma Zod `UserSchema` avec champs obligatoires, validations conditionnelles,
// et messages d’erreurs personnalisés en français.

// Documentation utile :

// https://zod.dev/api#objects

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

// ✅ TODO - Étapes à suivre :

// 🟠 Étape 1 – Préparation
// - Créer un fichier userSchema.ts
// - Importer `z` depuis "zod"

import { z } from "zod";

// 🟡 Étape 2 – Champs de base
// - Définir un objet Zod avec :
// - id : string nullable
// - firstName : string, min 3 caractères, obligatoire (non null)
// - lastName : string, min 3 caractères, obligatoire (non null)
// - fullName : string nullable
// - email : string, email valide, obligatoire (non null)
// - isPasswordEditable : booléen optionnel
// - password : string nullable
// - passwordCopy : string nullable

export const UserSchema = z
  .object({
    id: z.string().nullish(), // valeur, undefined (champ peut être omis), null

    // firstName : minimum 3 caractères, non null, avec refine pour vérifier non null

    // lastName : minimum 3 caractères, non null à valider dans le string object

    // fullName : string nullable

    // email : format email valide, non null

    // - isPasswordEditable : booléen optionnel

    // - password : string nullable

    // - passwordCopy : string nullable
  })

  // 🔵 Étape 3 – Validation conditionnelle avec superRefine
  // - Si isPasswordEditable est true :
  //   - password est requis
  //   - password doit faire minimum 3 caractères
  //   - password doit être égal à passwordCopy

  // addIssue permet d’ajouter une erreur personnalisée

  // ctx.addIssue({
  //   code: z.ZodIssueCode.too_small,
  //   minimum: 3,
  //   type: "string",
  //   inclusive: true,
  //   message: "Minimum 3 caractères",
  //   path: ["nom_champ"],
  // });

  // https://zod.dev/api#refinements

  .superRefine((val, ctx) => {});

// 🟣 Étape 4 – Export des types
// - Exporter (infer) le type User depuis le schéma (hint : documenation => Defining schemas => objects) // https://zod.dev/api#objects

// - Définir un type AuthUser qui hérite de User avec une propriété defaultCultureKey facultative
// doc : https://www.typescripttutorial.net/typescript-tutorial/typescript-intersection-types/
// https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html
