import User from '../models/User.js';

export const registerUser  = async (req, res) => {
    const { username, password } = req.body;
    const newUser  = new User({ username, password });
    await newUser .save();
    res.status(201).json(newUser );
};
