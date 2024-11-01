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
    const { name, email } = req.body; // Assuming you're updating name and email
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
    try {
        await db.user.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};


