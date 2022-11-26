const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authmiddlewire = require("../middlewire/authMiddleWire")




router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({
            email: req.body.email
        });

        if (userExists) {
            return res.status(200).send({
                message: "User Already Exists",
                success: false
            });
        }

        let password = req.body.password;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        req.body.password = hash;

        const user = new User(req.body);
        await user.save();
        res.status(200).send({
            message: "Account Created Successfully",
            success: true
        });

    } catch (error) {
        return res.status(400).send({
            message: "error Registering",
            success: false
        });
    }
});

router.post("/login", async(req, res) => {
    try {
        
        const user = await User.findOne({
            email: req.body.email
        });

        if(!user){
            return res.status(200).send({
                message: "User doesn't exists",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch){
            return res.status(200).send({
                message: "Password incorrect",
                success: false
            });
        }else{
        
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
            res.status(200).send({
                message: "Login successfull",
                success: true,
                token: token

            });
        }



    } catch (error) {
        return res.status(200).send({
            message: "Password incorrect",
            success: false
        });
    }
});



router.post("/get-info-by-id", authmiddlewire, async(req, res) => {
    try {
        const user = await User.findOne({
            id: req.body.userID
        });

        if(!user){
            return res.status(200).send({
                message: "User not found",
                success: false
            })
        }else{
            res.status(200).send({
                success: true,
                data:{
                    name: user.name,
                    email: user.email
                }
            })
        }
    } catch (error) {
        
    }
})


module.exports = router;