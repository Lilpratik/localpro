const User = require("../models/User");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        res.status(201).json({
            message: "Registration endpoint working",
            data: {
                name,
                email,
                phone,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    registerUser,
};