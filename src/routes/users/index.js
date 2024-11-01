const express = require('express');
const { authenticateToken } = require('./../../middlewares/auth');
const { getProtectedData } = require('./../../controllers/authControllers');
const { registerUser, loginUser } = require('./../../controllers/authControllers');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getFoodsByUserId,
    getCalculationResultsByUserId,
} = require('./handlers');

const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/', createUser);

userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

userRoutes.get('/:userId/foods', getFoodsByUserId);
userRoutes.get('/:userId/calculations', getCalculationResultsByUserId);
userRoutes.get('/protected', authenticateToken, getProtectedData);

module.exports = userRoutes;