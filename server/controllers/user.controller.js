const userModel = require("../models/user.model");
const blackListTokenModel = require("../models/blacklistToken.model")
const { validationResult } = require("express-validator");
const userService = require("../services/user.service");


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname: { firstname, lastname }, email, password } = req.body;
    const isUserExists = await userModel.findOne({ email });
    if (isUserExists) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({ firstname, lastname, email, password: hashedPassword });
    const token = user.generateAuthToken();
    return res.status(201).json({ user, token });

};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    return res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res, next) => {
    return res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({token})
    res.status(200).json({message: 'Logged Out!'})
}