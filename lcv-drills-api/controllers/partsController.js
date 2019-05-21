const router = require('express').Router();
const csv = require('fast-csv');
const mongoose = require('mongoose');
const Parts = require('../models/drillPartsSchema');

router.get('/', async (req, res)=>{
    try{
        parts = await Parts.find({});
        res.json({
            status: 200,
            parts
        })
    }catch(err){
        console.log(err);
    }
});

router.post('/csv', async (req, res)=>{
    console.log('reached /csv post');
    const parts = [];

    try{
        await csv
        .fromPath("data/gardner-denver-compressor-parts-and-more.csv", {
            headers: true,
            ignoreEmpty: true
        })
        .on('data', async function(data){
            let partNumStr = data.part_number;
            console.log(typeof partNumStr);
            partNumStr = partNumStr.replace(/ /g, "");
            console.log('|'+ partNumStr + '|');
            data.part_number = partNumStr;
            console.log(data);
            parts.push(data);
        })
        .on('end', async function(){
            const createdParts = await Parts.create(parts);
            res.json({
                status: 200,
                data: createdParts
            });
        });
    }catch(err){
        console.log(err);
    }
});

module.exports = router;