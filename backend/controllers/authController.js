const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


/* register user */
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // check required fields 
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "Please provide name, email, password and phone",
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists",
            });
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        // generate JWT token 
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // send response 
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registered error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

/* login user */

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate input
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
            });
        }

        // find user 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // generate jwt 
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // send respone 
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};


/* Middleware test */
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });
    } catch (error) {
        console.error("Get user error:", error);

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};

