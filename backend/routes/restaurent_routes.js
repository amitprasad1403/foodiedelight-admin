const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { addRestaurent, getAllRestaurents, getRestaurentById, updateRestaurent, deleteRestaurent, getAllActiveRestaurents, getRestaurentDetails } = require('../controller/Restaurent_controller');
const upload = require('../middleware/upload');

// Admin
router.post("/addRestaurent",
    upload.single('file'),
    [
        check('resto_name').notEmpty().withMessage('Restaurant name is required'),
        check('phone_number').isMobilePhone().withMessage('Invalid phone number'),
        check('address').notEmpty().withMessage('Address is required'),
        check('state').notEmpty().withMessage('State is required'),
        check('city').notEmpty().withMessage('City is required')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
    addRestaurent
);

router.get("/list", getAllRestaurents);
router.get("/get/:id", getRestaurentById);

router.post("/update/:id",
    (req, res, next) => {
        if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
            upload.single('file')(req, res, next);
        } else {
            next();
        }
    },
    [
        check('resto_name').optional().notEmpty().withMessage('Restaurant name cannot be empty'),
        check('phone_number').optional().isMobilePhone().withMessage('Invalid phone number'),
        check('address').optional().notEmpty().withMessage('Address cannot be empty'),
        check('state').optional().notEmpty().withMessage('State cannot be empty'),
        check('city').optional().notEmpty().withMessage('City cannot be empty')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
    updateRestaurent
);

router.post("/delete/:id", deleteRestaurent);

// User
router.get("/getRestaurents", getAllActiveRestaurents);
router.get("/getRestaurentdetails/:id", getRestaurentDetails);

module.exports = router;
