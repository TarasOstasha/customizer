const express = require('express');
//const multer = require('multer');
const router = express.Router();

const colorModel = require('../models/colorModel');
const materialModel = require('../models/materialModel');
const typeModel = require('../models/typeModel');
const dimensionsModel = require('../models/dimensionsModel');
const AdminProduct = require('../models/productModel');

const fs = require('fs');
const pfs = fs.promises;


router.get('/finish-type', (req, res, next) => {
    const finishType = [
        { value: 'Standard - Double Fold/Double Stitch & Grommets' },
        { value: 'Standard - Double Fold/Double Stitch, Grommets & Rope' },
        { value: 'Reinforced Corners - Double Fold/Double Stitch & Grommets' },
        { value: 'Reinforced Corners - Double Fold/Double Stitch, Grommets & Rope' },
        { value: 'Webbing - Double Fold/Double Stitch' },
        { value: 'Webbing - Double Fold/Double Stitch & Grommets' },
        { value: 'D-Ring with Webbing - Double Fold/Double Stitch D-Rings in corners' },
        { value: 'D-Ring with Webbing - Double Fold/Double Stitch D-Rings in corners & Grommets' },
        { value: 'Display Style - Double Fold/Single Stitch NO Grommets' },
        { value: 'Display Style - Double Fold/Single Stitch with Grommets' },
        { value: 'Pole Pockets - Single Fold/Single Stitch Pole Pocket Top/Btm No sewn sides' },
        { value: 'Pole Pockets - Single Fold/Single Stitch Pole Pocket Top ONLY No sewn sides' },
        { value: 'Pole Pockets - Double Fold/Top&Bottom Pole Pocket Sewn sides' },
        { value: 'Pole Pockets - Double Fold/Single Stitch Pole Pocket Top ONLY Sewn sides' },
        { value: 'Sewn Double-Folded/Double Stitched Pockets, no sewn sides' },
        { value: 'Sewn Double-Folded/Double Stitched Pockets, sewn sides' },
        { value: 'Please Select a Finishing Type' },
    ]
    res.status(201).json({
        message: 'finish type fetched successfully',
        posts: finishType
    });
});
router.get('/blank-material', async (req, res) => {
    try {
        // const materials = [
        //     { value: '10 oz Vinyl' },
        //     { value: '13 oz Vinyl (Most Popular)' },
        //     { value: '13 oz Smooth Vinyl' },
        //     { value: '18 oz Opaque Vinyl' }
        // ];

        // METHOD WITH ASYNC AWAIT \\
        const data = await materialModel.find({});
        console.log(data)
        res.status(200).json({
            message: 'blank material fetched successfully!!!',
            posts: data
        });
        // METHOD WITH PROMISE \\
        // optionModel.find()
        //     .then(documents => {
        //         res.status(200).json({
        //             message: 'blank material fetched successfully',
        //             posts: documents
        //         })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // })

    } catch (error) {
        console.log(error, 'error line 67');
    }
});
router.get('/color-one-sided', (req, res) => {
    try {
        const oneSidedMaterial = [
            { value: '9 oz Mesh Vinyl' },
            { value: '10 oz Vinyl' },
            { value: '13 oz Vinyl (Most Popular)' },
            { value: '13 oz Smooth Vinyl' },
            { value: '18 oz Vinyl' },
            { value: 'Poly-Poplin Fabric' },
            { value: 'Super Poly Knit Fabric' }
        ];
        res.status(200).json({
            message: 'full color one sided material fetched successfully',
            posts: oneSidedMaterial
        });
    } catch (error) {
        console.log(error);
    }
});
router.get('/color-two-sided', (req, res) => {
    try {
        const twoSidedMaterial = [
            { value: '13 oz Smooth Vinyl' },
            { value: '18 oz Opaque Vinyl (Most Popular)' },
            { value: 'Poly-Poplin Fabric' },
            { value: 'Super Poly Knit Fabric' }
        ];
        res.status(200).json({
            message: 'full color two sided material fetched successfully',
            posts: twoSidedMaterial
        });
    } catch (error) {
        console.log(error);
    }
});

router.post('/product-data', (req, res) => {
    try {
        const data = req.body;
        res.status(200).json({
            message: 'product data fetched successfully',
            data: data
        });
    } catch (error) {
        return res.status(400).json({ error: error.toString() });
    }
});


router.post('/admin-data/product-dimensions', async (req, res) => {
    //console.log(req.body.width, '-width', req.body.height, '-height');

    //console.log(data)
    const dimensionsData = [
        { width: 2, height: 2, price: 10 },
        { width: 2, height: 3, price: 20 },
        { width: 2, height: 4, price: 30 },
        { width: 2, height: 5, price: 40 },
        { width: 2, height: 6, price: 50 },
        { width: 2, height: 7, price: 60 },
        { width: 2, height: 8, price: 70 },
        { width: 2, height: 9, price: 80 },
        { width: 2, height: 10, price: 90 },

        { width: 3, height: 2, price: 10 },
        { width: 3, height: 3, price: 20 },
        { width: 3, height: 4, price: 30 },
        { width: 3, height: 5, price: 40 },
        { width: 3, height: 6, price: 50 },
        { width: 3, height: 7, price: 60 },
        { width: 3, height: 8, price: 70 },
        { width: 3, height: 9, price: 80 },
        { width: 3, height: 10, price: 90 },

        { width: 4, height: 2, price: 10 },
        { width: 4, height: 3, price: 20 },
        { width: 4, height: 4, price: 30 },
        { width: 4, height: 5, price: 40 },
        { width: 4, height: 6, price: 50 },
        { width: 4, height: 7, price: 60 },
        { width: 4, height: 8, price: 70 },
        { width: 4, height: 9, price: 80 },
        { width: 4, height: 10, price: 90 },

        { width: 5, height: 2, price: 10 },
        { width: 5, height: 3, price: 20 },
        { width: 5, height: 4, price: 30 },
        { width: 5, height: 5, price: 40 },
        { width: 5, height: 6, price: 50 },
        { width: 5, height: 7, price: 60 },
        { width: 5, height: 8, price: 70 },
        { width: 5, height: 9, price: 80 },
        { width: 5, height: 10, price: 90 },

        { width: 6, height: 2, price: 10 },
        { width: 6, height: 3, price: 20 },
        { width: 6, height: 4, price: 30 },
        { width: 6, height: 5, price: 40 },
        { width: 6, height: 6, price: 50 },
        { width: 6, height: 7, price: 60 },
        { width: 6, height: 8, price: 70 },
        { width: 6, height: 9, price: 80 },
        { width: 6, height: 10, price: 90 },

        { width: 7, height: 2, price: 10 },
        { width: 7, height: 3, price: 20 },
        { width: 7, height: 4, price: 30 },
        { width: 7, height: 5, price: 40 },
        { width: 7, height: 6, price: 50 },
        { width: 7, height: 7, price: 60 },
        { width: 7, height: 8, price: 70 },
        { width: 7, height: 9, price: 80 },
        { width: 7, height: 10, price: 90 },

        { width: 8, height: 2, price: 10 },
        { width: 8, height: 3, price: 20 },
        { width: 8, height: 4, price: 30 },
        { width: 8, height: 5, price: 40 },
        { width: 8, height: 6, price: 50 },
        { width: 8, height: 7, price: 60 },
        { width: 8, height: 8, price: 70 },
        { width: 8, height: 9, price: 80 },
        { width: 8, height: 10, price: 90 },

        { width: 9, height: 2, price: 10 },
        { width: 9, height: 3, price: 20 },
        { width: 9, height: 4, price: 30 },
        { width: 9, height: 5, price: 40 },
        { width: 9, height: 6, price: 50 },
        { width: 9, height: 7, price: 60 },
        { width: 9, height: 8, price: 70 },
        { width: 9, height: 9, price: 80 },
        { width: 9, height: 10, price: 90 },

        { width: 10, height: 2, price: 10 },
        { width: 10, height: 3, price: 20 },
        { width: 10, height: 4, price: 30 },
        { width: 10, height: 5, price: 40 },
        { width: 10, height: 6, price: 50 },
        { width: 10, height: 7, price: 60 },
        { width: 10, height: 8, price: 70 },
        { width: 10, height: 9, price: 80 },
        { width: 10, height: 10, price: 90 },
    ];

    const post = new dimensionsModel({
        width: req.body.width,
        height: req.body.width,
        price: req.body.price
    })
    post.save();
    res.status(201).json({
        message: 'Dimensions fetched successfully',
        data: post
    })
});

router.get('/admin-data/get-product-dimensions', async (req, res) => {
    const data = await dimensionsModel.find({});
    res.status(201).json({
        message: 'Size data from DB fetched successfully',
        data: data
    })
});

router.post('/admin-data/color-one-sided', (req, res) => {
    const data = req.body;
    const post = new colorModel({
        prodColor: req.body.color,
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Color added successfully'
    });
});

router.post('/admin-data/material', (req, res) => {
    const post = new materialModel({
        prodMaterial: req.body.material
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Material added successfully'
    });
});

router.post('/admin-data/type', (req, res) => {
    const post = new typeModel({
        prodType: req.body.type
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Finishing Type added successfully'
    });
});

//redirect all get request to index.html. Must be the last!!!!!!!!!!!!!!!
router.get('/*', async (req, res, next) => {
    console.log('726', req.user, new Date())
    const html = await pfs.readFile('dist/index.html');
    console.log(html)
    res.end(html);
    // res.redirect('/index.html');
});



// const MIME_TYPE_MAP = {
//     'image/png': 'png',
//     'image/jpeg': 'jpg',
//     'image/jpg': 'jpg',
// }

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const isValid = MIME_TYPE_MAP[file.mimetype];
//         let error = new Error('Invalid mime type');
//         if (isValid) {
//             error = null;
//         }
//         cb(error, 'backend/images');
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         cb(null, name + '-' + Date.now() + '.' + ext);
//     }
// });

// router.post('/admin-product-data', multer({ storage: storage }).single('image'), (req, res) => {
//     console.log(req.body)
//     const url = req.protocol + "://" + req.get("host");
//     const product = new Product({
//         size: req.body.size,
//         group: req.body.group,
//         classification: req.body.classification,
//         pattern: req.body.pattern,
//         variety: req.body.variety,
//         model: req.body.model,
//         product_code: req.body.product_code,
//         price: req.body.price,
//         imagePath: url + "/images/" + req.file.filename
//     });
//     product.save()
//         .then(createdProduct => {
//             res.status(200).json({
//                 message: 'admin-product data fetched successfully',
//                 data: {
//                     ...createdProduct,
//                     id: createdProduct._id
//                 }
//             })
//         })
// });
//  imagePath: { type: String, required: true }

router.post('/admin-product-data', (req, res) => {
    console.log(req.body)
    const product = new AdminProduct({
        size: req.body.size,
        group: req.body.group,
        classification: req.body.classification,
        pattern: req.body.pattern,
        variety: req.body.variety,
        model: req.body.model,
        price: req.body.price,
    });
    product.save();
    res.status(200).json({
        message: 'admin-product data fetched successfully',
        data: product
    })

});


router.get('/admin-product-data', async (req, res) => {
   // const documents = await AdminProduct.find();
   const documents = await { test: 'one' }
    //console.log(documents);
    res.status(200).json({
        message: "Posts fetched successfully!",
        posts: documents
    });
});






module.exports = router;