const mongoose = require('mongoose');

const Schema = mongoose.Schema;


  const categorySchema=new Schema({

       name:  {  
          type: String,
          minLength: 5,
          maxLength: 100,
          required:true,
          unique: true
       },
       color:  {  
        type: String,
        minLength: 3,
        maxLength: 30,
        required:true,
     },
     icon:  {  
        type: String,
        minLength: 10,
        maxLength: 1000,
        required:true,
     },
     image:  {  
        type: String,
        minLength: 10,
        maxLength: 1000,
        required:true,
     }
  })
   module.exports= mongoose.model('categorie',categorySchema);