const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv= require('dotenv');

const userModel = require('../models/user.model');
const emailService = require('../services/EmailService');

dotenv.config();

exports.register = async (req, res) => {

    var user = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
        
    };

    let document = new userModel(user);

    try {
        let doc = await document.save();
        if (doc){
        var payload= {subject: doc._id}
        var token = jwt.sign(payload,process.env.JWT_SECRET);
            res.status(201).send({ success: true,token:token,message: "Registered successfully!" });
        }
        else
            res.status(404).send({ success: false, message: "Something went wrong" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
}
exports.login = async (req, res) => {

    try {
        let user = await userModel.findOne({ username: req.body.username });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                var payload= {subject: user._id}
                 var token = jwt.sign(payload,process.env.JWT_SECRET);
                res.status(200).send({ success: true,token:token, _id:user._id,message: "Login success!" });
            }
            else {
                res.status(401).send({ success: true, message: "Password incorrect" });
            }
        }

        else
            res.status(404).send({ success: false, message: "user not found" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
}
exports.changePassword = async (req, res) => {
    try {
        let user = await userModel.findOne({ username: req.body.username });
        if (user) {
            if (bcrypt.compareSync(req.body.currentPassword, user.password)) {
                let updatedUser = await userModel.findOneAndUpdate({ username: req.body.username }, { password: bcrypt.hashSync(req.body.newPassword, 10) },{new:true});
                if (updatedUser) {
                    if (bcrypt.compareSync(req.body.newPassword, updatedUser.password)) {
                        res.status(200).send({ success: true, message: "password changed!" });
                    }
                    else {
                        res.status(500).send({ success: false, message: "Something went wrong!!" });
                    }
                }
                else {
                    res.status(401).send({ success: false, message: "failed in updating password " });
                }
            }
            else {
                res.status(401).send({ success: true, message: "Current Password incorrect" });
            }
        }

        else
            res.status(404).send({ success: false, message: "user not found" });

    } catch (error) {
        console.log("inside catch block")
        console.log(error);
        return res.status(500).send({ success: false, message: error.message })
    }
}
exports.resetPassword = async (req, res) => {
    try {
        let user = await userModel.findOne({ username: req.body.username });
        if (user) {
                let updatedUser = await userModel.findOneAndUpdate({ username: req.body.username }, { password: bcrypt.hashSync(req.body.newPassword, 10) },{new:true});
                if (updatedUser) {
                        res.status(200).send({ success: true, message: "password reset done changed!" });
                    }
                    else {
                        res.status(500).send({ success: false, message: "Something went wrong!!" });
                    }
            }
        else
            res.status(404).send({ success: false, message: "user not found" });

    } catch (error) {
        console.log("inside catch block")
        console.log(error);
        return res.status(500).send({ success: false, message: error.message })
    }
}
exports.forgotPassword =  async (req, res) => {

    try {
        let user = await userModel.findOne({ email: req.body.email});
        if (user) {
                 emailService.sendEmail({ 
                     to: req.body.email,
                     subject : "Email Reset",
                     html: `
                            <a href="http://127.0.0.1:5502/19July2021/Ecommerce/customer/dashboard/dashboard.html">Password reset link</a>
                     `
                    })
                res.status(200).send({ success: true,message: "password reset link has been shared to your email" });
            }
            else {
                res.status(404).send({ success: true, message: "Email Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
}

   
exports.updateRole = async (req, res) => {
  
     console.log(req.body);

      

    try {
        console.log("_id",req.body._id);
        let user= await userModel.findOne({_id:req.body._id});
        console.log('user',user);
         if(user.isAdmin){
            let updatedUser = await userModel.findByIdAndUpdate(req.body.target_id,{isAdmin:req.body.isAdmin}, {new:true});
            if (updatedUser) {
                    res.status(200).send({ success: true, message: "role updated successfully!" });
                }
                else {
                    res.status(404).send({ success: true, message: "user Not found" });
                }
         }
         else
         {
             res.status(401).send({success:false, message:"Unauthorized operation"});
         }
        
        

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }

}

exports.getAllUsers=  async (req, res) => {

    try {
        let docs = await userModel.find();
        if (docs)
            res.status(201).send({ success: true,allUsers:docs, message: "users fetched successfully!" });
        else
            res.status(404).send({ success: false, message: "Something went wrong" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
  
}


/*

Develop a small application as specified below

·  On initial loading of application it should show the data in the grid.

·  Each row should have a column called edit and delete

·  On click of edit it should navigate to edit screen should be able populate that edit and come back to previous screen

·  On click of delete navigate to new delete confirmation screen and on delete it should come back to previous screen

·  On top of the grid you should add a button to navigate to Add new post screen on click of Add in that new screen should comeback to previous screen and update the grid with this new data which is added

·  Edit screen should be taken to same page but should populate with existing data and route name should be changed

·  All components should be functional components

You can use the link below for the data , take this JSON data into state variable and use this data to update delete add into this state


*/
 


// plan 8:


// AWS / GCP 

// kubs, lambda, basic aws services, buidling apps.

// react and mean stack 





