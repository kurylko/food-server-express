const db = require('./../../db/index');

async function getAllCalculationResults(req, res) {
    try {
        const results = await db.calculationResult.findMany();
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch calculation results' });
    }
}

async function getCalculationResultById(req, res) {
    const { id } = req.params;
    try {
        const result = await db.calculationResult.findUnique({
            where: { id: parseInt(id) },
        });
        if (!result) {
            return res.status(404).json({ error: 'Calculation result is not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch calculation result' });
    }
}

async function createCalculationResult(req, res) {
    const { userId, foodName, fat, protein, carbohydrate, calories, weight } = req.body;
    try {
        const newResult = await db.calculationResult.create({
            data: {
                userId,
                foodName,
                fat,
                protein,
                carbohydrate,
                calories,
                weight,
            },
        });
        res.status(201).json(newResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create calculation result' });
    }
}


async function deleteCalculationResult(req, res) {
    const { id } = req.params;
    try {
        await db.calculationResult.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete calculation result' });
    }
}

module.exports = {
    createCalculationResult,
    getAllCalculationResults,
    getCalculationResultById,
    deleteCalculationResult,
};