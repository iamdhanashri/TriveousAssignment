
const express = require('express');
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require('../models/user.model');

userRouter.post("/register", async (req, res) => {
    const { name, email, password,role } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.send({ msg: "user registration failed", "error": err.message });
            }
            else {
                const user = new UserModel({ name, email, password: hash,role });
                await user.save();
                res.send({ msg: "user registration successful" });
            }
        });

    } catch (e) {
        res.send({ msg: "user registration failed", "error": e.message });
    }
});


userRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                // result == true
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "AHIRE")
                    res.send({ msg: "Login Succsess", "token": token });
                }
                else {
                    res.send({ msg: "user registration failed" });

                }
            });


        }
        else {
            res.send({ msg: "wrong Credentials" })
        }
    } catch (e) {
        res.send({ msg: "user registration failed", "error": e.message });

    }
});




module.exports = { userRouter }


