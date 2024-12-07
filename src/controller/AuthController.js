const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

const authController = {
    register: async (req, res) => {
        const {
            username,
            email,
            password,
            address,
            work,
            profile_picture_path,
        } = req.body;
        
        try {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                username,
                email,
                password: hashPassword,
                address,
                work,
                profile_picture_path,
            });
            await newUser.save();
            return res.status(201).json(newUser);
        } catch (error) {
            console.error("Error in registration:", error);
            return res.status(500).json({ error: "Failed to register user" });
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) return res.status(401).json({message: "Unauthentication"});
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) return res.status(401).json({message: "Password not Correct!"});
            const token = getToken(user);
            return res.status(200).json({
                user,
                token,
                message: 'login successful',
            });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    checkAuth: async (req, res) => {
        try {
            const id = req.user._id;
            const user = await User.findById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(401).json({message: "Authentication"});
        }
    }

};
module.exports = authController;

function getToken(user) {
    return jwt.sign({
        data: user
    }, process.env.JWT_KEY , { expiresIn: '5h' })
}

