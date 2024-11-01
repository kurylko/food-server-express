const express = require('express');

const {
    createFood,
    getAllFood,
    getFoodById,
    updateFood,
    deleteFood,
} = require('./handlers');

const foodRoutes = express.Router();

foodRoutes.post('/', createFood);
foodRoutes.get('/', getAllFood);
foodRoutes.get('/:id', getFoodById);
foodRoutes.put('/:id', updateFood);
foodRoutes.delete('/:id', deleteFood);


module.exports = foodRoutes;