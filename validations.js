import { body } from 'express-validator'

export const loginValidation = [
    body('login', 'Login должен быть минимум 4 символа').isLength({ min: 4}),
    body('password', 'Пароль должен быть минимум 4 символа').isLength({ min: 4}),
];

export const CollectCreateValidation = [
    body('title', 'Введите заголовок коллекции').isLength({ min: 3 }).isString(),
    body('data', 'Неверный формат категорий (укажите массив)').optional().isArray().notEmpty(),
];