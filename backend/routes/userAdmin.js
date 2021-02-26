const express = require('express');

const router = express.Router();

const AdminProduct = require('../models/productModel');

router.post('/admin-data/my-prod', (req, res) => {
    try {
        const dataForm = req.body;
        console.log(dataForm, 'dataForm from front end');
        const data = new AdminProduct({
            size: dataForm.size,
            group: dataForm.group,
            classification: dataForm.classification,
            pattern: dataForm.pattern,
            variety: dataForm.pattern,
            model: dataForm.pattern,
            price: dataForm.pattern
        });
        data.save();
        res.status(200).json({
            message: 'product fetched successfully!!!',
            data: data
        });
    } catch (error) {
        console.log(error);
    }

});
console.log('this is admin page')


module.exports = router;