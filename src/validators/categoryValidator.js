import { body, validationResult } from 'express-validator';

// Validator pour les catégories
export const validateCategory = [
  body('nom')
    .notEmpty()
    .withMessage('Le nom de la catégorie est requis.')
    .isLength({ max: 50 })
    .withMessage('Le nom de la catégorie ne doit pas dépasser 50 caractères.'),
];

// Middleware pour gérer les erreurs de validation
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
