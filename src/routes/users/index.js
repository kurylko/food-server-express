const express = require('express');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getFoodsByUserId
} = require('./handlers');

const userRoutes = express.Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);
userRoutes.get('/:userId/foods', getFoodsByUserId);


module.exports = userRoutes;