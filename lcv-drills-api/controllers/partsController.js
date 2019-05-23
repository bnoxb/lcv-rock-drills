const router = require('express').Router();
const csv = require('fast-csv');
const mongoose = require('mongoose');
const Parts = require('../models/drillPartsSchema');

router.get('/', async (req, res)=>{
    try{
        parts = await Parts.find({});
        res.json({
            status: 200,
            data: parts
        })
    }catch(err){
        console.log(err);
    }
});

router.post('/csv', async (req, res)=>{
    if (!req.files){
        res.json({
            status: 400,
            data: "No Files were uploaded"
        });
    }
    
    const parts = [];

    try{
        await csv
        .fromString(req.files.file.data, {
            headers: true,
            ignoreEmpty: true
        })
        .on('data', async function(data){

            try{
                let partNumStr = data.part_number;
                partNumStr = partNumStr.replace(/ /g, "");
                data.part_number = partNumStr;
                data.company = req.body.company;
                data.type = req.body.type;
                parts.push(data);
            }catch(err){
                console.log(err);
            }
            
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

router.get('/browse/:company/:type', async (req, res)=>{
    try{
        const cleanCompany = decodeURI(req.params.company);
        const cleanType = decodeURI(req.params.type);
        const foundParts = await Parts.find({ company: cleanCompany, type: cleanType });

        res.json({
            status: 200,
            data: foundParts
        })
    }catch(err){
        console.log(err);
    }
})

module.exports = router;