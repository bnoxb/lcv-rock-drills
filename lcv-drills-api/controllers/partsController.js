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
    console.log(req.body);
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
                if(req.body.companyKey !== "atlasCopCo" && req.body.companyKey != "ingersollRand"){
                    let partNumStr = data.part_number;
                    partNumStr = partNumStr.replace(/ /g, "");
                    data.part_number = partNumStr;
                    
                } else {
                    
                    let partNum = data.part_number;

                    if(data.part_number.length > 0){
                        while(partNum.charAt(data.part_number.length - 1) === " "){
                            partNum = partNum.slice(0, data.part_number.length - 1);
                        }
                        while(partNum.charAt(0) === " "){
                            partNum = partNum.slice(0, 1);
                        }
                        data.part_number = partNum;
                    }

                    if(req.body.companyKey === "ingersollRand"){
                        if(!data.part_number){
                            data.part_number = " ";
                        } else if(!data.new_part_number){
                            data.new_part_number = " ";
                        }

                        if(data.new_part_number){
                            let newPartNum = data.new_part_number;
                            while(newPartNum.charAt(data.new_part_number.length - 1) === " "){
                                newPartNum = newPartNum.slice(0, data.new_part_number.length - 1);
                            }
                            while(newPartNum.charAt(0) === " "){
                                newPartNum = newPartNum.slice(0, 1);
                            }
                            data.new_part_number = newPartNum;
                        }
                    }

                    
                }
                data.company = req.body.company;
                data.companyKey = req.body.companyKey;
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
                company: req.body.company,
                companyKey: req.body.companyKey,
                type: req.body.type,
                data: createdParts
            });
        });
    }catch(err){
        console.log(err);
    }
});

router.get('/browse/:companyKey/:type', async (req, res)=>{
    try{
        const cleanCompany = decodeURI(req.params.company);
        const cleanType = decodeURI(req.params.type);
        console.log(req.params.companyKey);
        const foundParts = await Parts.find({ companyKey: req.params.companyKey, type: cleanType });

        res.json({
            status: 200,
            data: foundParts
        })
    }catch(err){
        console.log(err);
    }
});

router.get('/search/:partNum', async (req,res)=>{
    console.log(req.params.partNum);
    try{
        const part = await Parts.findOne( {$or: [{"part_number" : req.params.partNum}, {"new_part_number": req.params.partNum}]});
        console.log(part);
        if(!part){
            console.log("part not found");
        }

        res.json({
            status: 200,
            data: part
        });

    }catch(err){
        console.log(err);
    }
})

module.exports = router;