const blackListTokenModel = require("../models/blacklistToken.model.js")
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service.js");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname: { firstname, lastname }, email, password, vehicle: { color, plate, capacity, vehicleType } } = req.body;
    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({ error: "Captain already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain(
        firstname,
        lastname,
        email,
        hashedPassword,
        color,
        plate,
        capacity,
        vehicleType);
    const token = captain.generateAuthToken();
    return res.status(201).json({ captain, token });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValidPassword = await captain.comparePassword(password);
    if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = captain.generateAuthToken();
    return res.status(200).json({ captain, token });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    return res.status(200).json({captain: req.captain})
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blackListTokenModel.create({token})
    return res.status(200).json({message: "Logged out"})
}