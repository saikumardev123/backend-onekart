
var productModel = require('../models/product.model');

exports.add = async (req, res) => {
    let document = new productModel(req.body);
    try {
        let doc = await document.save();
        if (doc)
            res.status(201).send({ success: true, message: "product added successfully!" });
        else
            res.status(404).send({ success: false, message: "Something went wrong" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
}
exports.list = async (req, res) => {
    try {
        let docs = await productModel.find();
        if (docs)
            res.status(201).send({ success: true,products:docs, message: "products fetched successfully!" });
        else
            res.status(404).send({ success: false, message: "Something went wrong" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
}

exports.getById = async (req, res) => {
  
    try {
        let product = await productModel.findById({ _id: req.params.id});
        if (product) {
                res.status(200).send({ success: true, product: product });
            }
            else {
                res.status(404).send({ success: true, message: "product Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
      
}

exports.deletebyId = async (req, res) => {

    try {
        let product = await productModel.findByIdAndRemove(req.params.id);
        if (product) {
                res.status(200).send({ success: true, message: "deleted successfully!" });
            }
            else {
                res.status(404).send({ success: true, message: "product Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }

}

exports.updateById = async (req, res) => {
         console.log("req.body",req.body);
    try {
        let product = await productModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if (product) {
            console.log('updated product',product);
                res.status(200).send({ success: true, message: "updated successfully!" });
            }
            else {
                res.status(404).send({ success: true, message: "product Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }

}

exports.filter= async(req,res) => {
       var term = req.body.term;
       var condition = req.body.condition;
       console.log(req.body);
       console.log({[term]:condition});
    try {
        let docs = await productModel.find().sort({[term]:condition});
        if (docs)
            res.status(201).send(docs);
        else
            res.status(404).send({ success: false, message: "Something went wrong" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }

}


