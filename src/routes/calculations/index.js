const express = require('express');

const {
  createCalculationResult,
  getAllCalculationResults,
  getCalculationResultById,
  deleteCalculationResult,
} = require('./handlers');


const calculationResultRoutes = express.Router();

calculationResultRoutes.post('/', createCalculationResult);
calculationResultRoutes.get('/', getAllCalculationResults);
calculationResultRoutes.get('/:id', getCalculationResultById);
calculationResultRoutes.delete('/:id', deleteCalculationResult);

module.exports = calculationResultRoutes;
