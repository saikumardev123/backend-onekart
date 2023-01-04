const express = require('express');

const userRouter =express.Router();

const jwt = require('jsonwebtoken');

const userController = require('../controllers/user.controller');


var authMiddleware = function(req,res,next){

    console.log(req.headers);

     if(req.headers.authorization){
            var token = req.headers.authorization.split(' ')[1];

             if(token != "null" && token != undefined){
                
                try{                
               var payload=jwt.verify(token, process.env.JWT_SECRET);
               
               console.log("payload",payload);
               console.log("req.body._id",req.body._id);
               if(payload.subject == req.body._id){
                   next();
               }
               else
               {
                res.status(401).send("unauthorized access!");
               }
            }
            catch(error){
 
                res.status(401).send({error:error.message});

            }
             }
             else
             {
                res.status(401).send("unauthorized access!");
             }
     }
     else
     {
        res.status(401).send("unauthorized access!");
     }
}

userRouter.post('/forgotpassword',userController.forgotPassword);

// http://locahost:8089/user/register
userRouter.post('/register',userController.register);

userRouter.post('/login', userController.login);

userRouter.put('/resetPassword' ,userController.resetPassword);

userRouter.put('/changePassword' ,userController.changePassword);

userRouter.patch("/updateRole", userController.updateRole);

userRouter.get('/allUsers', userController.getAllUsers);

module.exports = userRouter;

// https://www.facebook.com/

 
//    http://localhost:9011/api/v1.0.0/user/login
//   function login(usr,pwd){
//     // db operation
//   }



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjBiNzUzZDY3ZjYwN2Q3YWVhOTdkYjc1IiwiaWF0IjoxNjIyNzE0MjQ4fQ.ITTA_iWQVZ1fJOoX3O87Wvhrv1XH48JBFkbjQZUnlVM


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiNjBiOGE5MDlmODRhYWU0OTgzNzJiMzg0IiwiaWF0IjoxNjIyNzE0NjkxfQ.JeukP8Ide2CW9iAFH71RcNEnOUSgnIYeRewTldh8ijM