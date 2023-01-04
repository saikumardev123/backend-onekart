
  const orderItemModel = require('../models/order-item.model');
  const orderModel  = require('../models/order.model');

exports.allOrders = async (req,res) => {
           let orders = await orderModel.find().populate('user',['username','email']);
           if(!orders)
           return res.status(404).send("There are no orders!!");
           else
           return res.status(200).send(orders);
}

exports.getOrderById = async (req, res) => {
  
    try {
        let order = await orderModel.findById({ _id: req.params.id});
        if (order) {
                res.status(200).send(order);
            }
            else {
                res.status(404).send({ success: false, message: "Something went wrong!!" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }
      
}

exports.updateOrderById = async (req, res) => {
  
    try {
        let order = await orderModel.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if (order) {
                res.status(200).send({ success: true, message: "order updated successfully!" });
            }
            else {
                res.status(404).send({ success: true, message: "order Not found" });
            }

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message })
    }

}

exports.addOrder = async (req,res) => {

   const orderItemsIds=Promise.all(req.body.orderItems.map( async orderItem => {
       console.log(orderItem);
       let orderItemDoc = new orderItemModel(orderItem);
       orderItemDoc = await orderItemDoc.save();
        return orderItemDoc._id;
   }));
      const orderItemsIdsList=await orderItemsIds;
      console.log('orderItemsIdsList',orderItemsIdsList);
    var order = {
        "orderItems" : orderItemsIdsList,
        "shippingAddress1" : req.body.shippingAddress1,
        "shippingAddress2" : req.body.shippingAddress2,
        "city": req.body.city,
        "zip": req.body.zip,
        "country": req.body.country,
        "phone": req.body.phone,
        "user":req.body.user,
        "totalPrice":req.body.totalPrice
    }
    order = new orderModel(order);

    order = await order.save();

    if(!order)
      return res.status(500).send("Something went wrong!!");
      else
      return res.status(200).send("Order Placed Successfully!!");
}

/*

 {
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "60ba006979527eb5ca3ab71f"
        },
        {
            "quantity": 2,
            "product" : "60bdeadc696c5d438893da2e"
        }
    ],
    "shippingAddress1" : "Flowers Street , 45",
    "shippingAddress2" : "1-B",
    "city": "Prague",
    "zip": "00000",
    "country": "Czech Republic",
    "phone": "+420702241333",
    "user": "60bf401bab896b0be30b8493",
    "totalPrice":1000
}


*/


  

  











