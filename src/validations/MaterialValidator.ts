import { body, param } from "express-validator"

export const createMaterialValidator = [
    body('name')
        .not().isEmpty().withMessage('name harus diisi'),
    body('email')
        .not().isEmpty().isEmail().withMessage('email harus diisi'),
    body('phone')
        .not().isEmpty().isNumeric().withMessage('phone harus diisi'),
    body('password')
        .not().isEmpty().withMessage('password harus diisi')
]

export const updateMaterialValidator = [
    body('name')
        .not().isEmpty().withMessage('name harus diisi'),
    body('email')
        .not().isEmpty().isEmail().withMessage('email harus diisi'),
    body('phone')
        .not().isEmpty().isNumeric().withMessage('phone harus diisi'),
    body('password')
        .not().isEmpty().withMessage('password harus diisi'),
    param('id')
        .not().isEmpty().withMessage('id harus diisi')
        .isNumeric().withMessage('Masukan id berupa angka')
]

export const deleteMaterialValidator = [
    param('material_ids').isArray().withMessage('Masukan material id must be array'),
]

export const getMaterialValidator = [
    param('id').optional({ nullable: true }).isNumeric().withMessage('Masukan Id hanya berupa numeric'),
]