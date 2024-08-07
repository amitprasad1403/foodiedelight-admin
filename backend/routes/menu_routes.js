const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { addMenuFood, getAllMenuFood, getMenuById, updateMenu, deleteMenu, getTopMenu } = require('../controller/Menu_controller');
const upload = require('../middleware/uploadMenu');

// Admin
router.post("/addMenuFood",
    upload.single('file'),
    [
        check('restaurent_id').isNumeric().withMessage('Invalid restaurant ID'),
        check('food_name').notEmpty().withMessage('Food name is required'),
        check('price').isNumeric().withMessage('Invalid price'),
        check('category').notEmpty().withMessage('Category is required'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
    addMenuFood
);

router.get("/list/:id", getAllMenuFood);
router.get("/getMenu/:id", getMenuById);

router.post("/update/:id",
    (req, res, next) => {
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            upload.single('file')(req, res, next);
        } else {
            next();
        }
    },
    [
        check('food_name').optional().notEmpty().withMessage('Food name cannot be empty'),
        check('price').optional().isNumeric().withMessage('Invalid price'),
        check('category').optional().notEmpty().withMessage('Category cannot be empty'),
        check('ratings').optional().isNumeric().withMessage('Invalid ratings'),
        check('status').optional().isIn(['Active', 'In-Active']).withMessage('Invalid status'),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
    updateMenu
);

router.post("/delete/:id", deleteMenu);

// User
router.get("/topMenus", getTopMenu);

module.exports = router;
