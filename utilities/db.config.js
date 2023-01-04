

const mongoose = require('mongoose');
const dotenv= require('dotenv');

dotenv.config();

exports.connectToDB = () => {

mongoose.connect(process.env.DB_URL,  {useUnifiedTopology: true,useNewUrlParser: true}, (error) => {
    if(error){
        console.log("error in db connection, error is: "+error.message);
    }
    else
    {
        console.log("connected to database");
    }
})
}