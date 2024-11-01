const db = require('./../../db/index');

async function getAllFood(req, res) {
  try {
    const food = await db.food.findMany();
    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
}

async function getFoodById(req, res) {
  const { id } = req.params;
  try {
    const food = await db.food.findUnique({
      where: { id: id },
    });
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.status(200).json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
}

async function createFood(req, res) {
  const { foodName, fat, protein, carbohydrate, calories, weight, userId } =
    req.body;
  try {
    const newFood = await db.food.create({
      data: {
        foodName,
        fat,
        protein,
        carbohydrate,
        calories,
        weight,
        userId,
      },
    });
    res.status(201).json(newFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create food item' });
  }
}

async function updateFood(req, res) {
  const { id } = req.params;
  const { foodName, fat, protein, carbohydrate, calories, weight, userId } =
    req.body;
  try {
    const updatedFood = await db.food.update({
      where: { id: id },
      data: {
        foodName,
        fat,
        protein,
        carbohydrate,
        calories,
        weight,
      },
    });
    res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update food item' });
  }
}

async function deleteFood(req, res) {
  const { id } = req.params;
  try {
    await db.food.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete food item' });
  }
}

module.exports = {
  createFood,
  getAllFood,
  getFoodById,
  updateFood,
  deleteFood,
};
