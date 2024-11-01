const db = require('./../../db/index');

async function getAllUsers(req, res) {
  try {
    const users = await db.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;

  if (req.user.userId !== parseInt(id)) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to update this user.' });
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  if (req.user.userId !== parseInt(id)) {
    return res
      .status(403)
      .json({ error: 'You do not have permission to delete this user.' });
  }

  try {
    await db.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

async function getFoodsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const foods = await db.food.findMany({
      where: { userId: parseInt(userId) },
    });

    if (foods.length === 0) {
      return res
        .status(404)
        .json({ message: 'No food items found for this user.' });
    }

    return res.status(200).json(foods);
  } catch (error) {
    console.error('Error retrieving foods by user ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

async function getCalculationResultsByUserId(req, res) {
  try {
    const { userId } = req.params;

    const results = await db.calculationResult.findMany({
      where: { userId: parseInt(userId) },
    });

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: 'No calculation results found for this user.' });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving calculation results by user ID:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getFoodsByUserId,
  getCalculationResultsByUserId,
};
