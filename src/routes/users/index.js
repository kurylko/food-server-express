const express = require('express');

const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('./handlers');

const userRoutes = express.Router();

userRoutes.post('/', createUser);
userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);


module.exports = userRoutes;