const express = require('express');
const multer = require('multer');

const router = express.Router();

const AdminProduct = require('../models/productModel');


const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post('/admin-data/my-prod', multer({ storage: storage }).single('image'), (req, res) => {
    try {
        const url = req.protocol + '://' + req.get('host');
        const dataForm = req.body;
        console.log(dataForm, 'dataForm from front end');
        const data = new AdminProduct({
            size: dataForm.size,
            group: dataForm.group,
            classification: dataForm.classification,
            pattern: dataForm.pattern,
            variety: dataForm.variety,
            model: dataForm.model,
            price: dataForm.price,
            imagePath: url + '/backend/images/' + req.file.filename
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




router.get('/products', (req, res) => {
    try {
        let eightFoot = [
            {
                name: '8ft x 8ft Verge Single-Sided Pop Up SEG Display',
                size: 8,
                type: 'Popup Displays',
                backlit: true,
                frame: 'curved',
                price: 255,
                model: 'Single-Sided',
                link: 'https://www.xyzdisplays.com/ProductDetails.asp?ProductCode=cb40960'
            },
            {
                name: '8ft x 8ft Verge Single-Sided Pop Up SEG Display',
                size: 8,
                type: 'Tension Fabric Displays',
                backlit: true,
                frame: 'straight',
                price: 255,
                model: 'Double-Sided',
                link: 'https://www.xyzdisplays.com/ProductDetails.asp?ProductCode=cb40962'
            },
            {
                name: '20ft x 10ft Vector Frame Essential SEG Fabric Light Box',
                size: 20,
                type: 'SEG Displays',
                backlit: false,
                frame: 'curved',
                price: 305,
                model: 'Single-Sided',
                link: 'https://www.xyzdisplays.com/ProductDetails.asp?ProductCode=or100050'
            },
            {
                name: '30ft x 10ft Vector Frame Essential SEG Fabric Light Box',
                size: 30,
                type: 'SEG Displays',
                price: 320,
                model: 'Double-Sided',
                link: 'https://www.xyzdisplays.com/ProductDetails.asp?ProductCode=or100052'
            },
            {
                name: '10ft x 10ft Vector Frame SEG Fabric Banner Display ',
                size: 10,
                type: 'SEG Displays',
                price: 350,
                model: 'Single-Sided',
                link: 'https://www.xyzdisplays.com/ProductDetails.asp?ProductCode=or70080'
            },
            {
                name: '8ft x 8ft Vector Frame SEG Fabric Banner Display ',
                size: 8,
                type: 'SEG Displays',
                price: 400,
                model: 'Double-Sided',
                link: 'https://www.xyzdisplays.com/ProductDetails.asp?ProductCode=or70082'
            }

        ]
        res.status(200).json({
            message: 'Products successfully fetched',
            data: eightFoot
        });
    } catch (error) {

    }
    //console.log(get)

});

module.exports = router;