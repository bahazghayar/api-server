'use strict';

const express = require('express');
const validator = require('../middleware/validator.js');
const Clothes = require('../models/data-collection-class.js');
const clothesModel = require('../models/clothes.js');
const clothes = new Clothes(clothesModel);
const router = express.Router();

router.get('/', getClothes);
router.get('/:id', validator, getClotheById);
router.post('/', createClothe);
router.put('/:id', validator, updateClothe);
router.delete('/:id', validator, deleteClothe);


async function getClothes(req, res, next) {
    try {
        const resObj = await clothes.read();
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

async function getClotheById(req, res, next) {
    try {
        const resObj = await clothes.read(req.params.id);
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}


async function createClothe(req, res) {
    const clothesObject = req.body;
    try {
        const resObj = await clothes.create(clothesObject);
        res.status(201).json(resObj);
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateClothe(req, res, next) {
    const clothesObject = req.body;
    try {
        const resObj = await clothes.update(req.params.id, clothesObject);
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

async function deleteClothe(req, res, next) {
    try {
        const resObj = await clothes.delete(req.params.id);
        res.json(resObj);
    } catch (error) {
        next(error);
    }
}

module.exports = router;