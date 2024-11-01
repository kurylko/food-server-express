const db = require('./../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { email, name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: { email, name, password: hashedPassword },
    });

    return res.status(201).json({ message: 'User registered successfully', user });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
        where: { email },
    });

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials: User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials: Incorrect password' });
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ token });
}

const getProtectedData = (req, res) => {
    res.json({ message: "This is protected data", user: req.user });
};

module.exports = {  loginUser, registerUser, getProtectedData };