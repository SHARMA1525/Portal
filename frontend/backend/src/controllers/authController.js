const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide both email and password." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};

const seedUsers = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash("password123", 10);
        await User.deleteMany({ email: { $in: ['teacher@test.com', 'student@test.com'] } });
        const teacher = new User({
            name: "Test Teacher",
            email: "teacher@test.com",
            password: hashedPassword,
            role: "teacher"
        });
        const student = new User({
            name: "Test Student",
            email: "student@test.com",
            password: hashedPassword,
            role: "student"
        });
        await teacher.save();
        await student.save();

        res.status(201).json({ message: "Seed users successfully created!" });
    } catch (error) {
        console.error("Seeding error:", error);
        res.status(500).json({ message: "Could not seed users." });
    }
};

module.exports = { loginUser, seedUsers };
