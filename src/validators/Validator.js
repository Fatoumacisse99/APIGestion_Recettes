import { check, param, validationResult } from "express-validator";

const validateCreateRecipe = () => {
  return [
    check("titre")
      .not()
      .isEmpty()
      .withMessage("Le titre ne peut pas être vide!")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Minimum 6 caractères requis!"),
    check("ingredients")
      .not()
      .isEmpty()
      .withMessage("Les ingrédients ne peuvent pas être vides!"),
    check("type").not().isEmpty().withMessage("Le type ne peut pas être vide!"),
  ];
};

// Validation pour la mise à jour d'une recette
const validateUpdateRecipe = () => {
  return [
    param("id").not().isEmpty().withMessage("L'ID est requis!"),
    check("titre")
      .optional() // Rendre ce champ facultatif pour la mise à jour
      .isLength({ min: 6 })
      .withMessage("Minimum 6 caractères requis pour le titre!"),
    check("ingredients")
      .optional() // Rendre ce champ facultatif pour la mise à jour
      .not()
      .isEmpty()
      .withMessage("Les ingrédients ne peuvent pas être vides!"),
    check("type")
      .optional() // Rendre ce champ facultatif pour la mise à jour
      .not()
      .isEmpty()
      .withMessage("Le type ne peut pas être vide!"),
  ];
};

// Validation pour la suppression d'une recette
const validateDeleteRecipe = () => {
  return [
    param("id")
      .not()
      .isEmpty()
      .withMessage("L'ID est requis pour supprimer une recette!"),
  ];
};

// Middleware de validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// Exportation des fonctions
export {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateDeleteRecipe,
  validate,
};
