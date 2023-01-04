var categoryModel = require('../models/category.model');

exports.add = async (req, res) => {

    let document = new categoryModel(req.body);

    try {
        let doc = await document.save();
        if (doc)
            res.status(201).send({ success: true, message: "Category added successfully!" });
        else
            res.status(404).send({ success: false, message: "Something went wrong" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
  
}

exports.list = async (req, res) => {

    try {
        let docs = await categoryModel.find();
        if (docs)
            res.status(201).send({ success: true,categories:docs, message: "Categories fetched successfully!" });
        else
            res.status(404).send({ success: false, message: "Something went wrong" });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
  
}
exports.getById = async (req, res) => {
  
    try {
        let category = await categoryModel.findById({ _id: req.params.id});
        if (category) {
                res.status(200).send({ success: true, category: category });
            }
            else {
                res.status(404).send({ success: true, message: "category Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
      

}
exports.deletebyId = async (req, res) => {

    try {
        let category = await categoryModel.findByIdAndRemove(req.params.id);
        if (category) {
                res.status(200).send({ success: true, message: "deleted successfully!" });
            }
            else {
                res.status(404).send({ success: true, message: "category Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }

}
exports.updateById = async (req, res) => {
  
    try {
        let category = await categoryModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if (category) {
                res.status(200).send({ success: true, message: "updated successfully!" });
            }
            else {
                res.status(404).send({ success: true, message: "category Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }

}
