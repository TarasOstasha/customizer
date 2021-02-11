const express = require('express');
const router = express.Router();

const optionModel = require('../models/optionsModel');



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
        const data = await optionModel.find({});
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
        console.log(error);
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

router.post('/admin-data', (req, res) => {
    const data = req.body;

    const post = new optionModel({
        prodColor: req.body.color,
        prodMaterial: req.body.material,
        prodType: req.body.type
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});





module.exports = router;