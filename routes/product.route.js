const express = require('express');

const productRouter = express.Router();

var productController = require('../controllers/product.controller');

productRouter.post('/add', productController.add);
productRouter.get('/list', productController.list);
productRouter.get('/:id', productController.getById);
productRouter.delete('/:id', productController.deletebyId);
productRouter.put('/:id', productController.updateById);
productRouter.get('/list/filter', productController.filter);
module.exports = productRouter;
/*

{
    "success": true,
    "product": {
        "images": [
            "https://rukminim1.flixcart.com/image/416/416/kklhbbk0/mobile/w/w/k/m3-mzb087ain-poco-original-imafzxf895fmsahg.jpeg?q=70",
            "https://rukminim1.flixcart.com/image/416/416/kklhbbk0/mobile/r/m/i/m3-mzb087ain-poco-original-imafzxf8tb3nhkxg.jpeg?q=70",
            "https://rukminim1.flixcart.com/image/416/416/kklhbbk0/mobile/8/8/6/m3-mzb087ain-poco-original-imafzxf8v8tycqkq.jpeg?q=70"
        ],
        "_id": "60bdea35696c5d438893da2d",
        "name": "POCO M3 (Cool Blue, 64 GB)  (6 GB RAM)",
        "description": "The POCO M3 is a stylish personal device that offers immersive visuals, seamless performance, and long battery life for uninterrupted functioning. This smartphone features a Premium Design to let you flaunt style, 6 GB LPDDR4X RAM for smooth performance, and an FHD+ Display for clear and detailed visuals.",
        "richDescription": "Premium DesignThe POCO M3 features a textured back panel and a premium leather-like finish to offer an elegant look to this smartphone. Also, it has a side-mounted fingerprint sensor that adds a premium style and convenience.",
        "image": "https://rukminim1.flixcart.com/image/416/416/kklhbbk0/mobile/h/i/q/m3-mzb087ain-poco-original-imafzxf8zqkcgwfv.jpeg?q=70",
        "brand": "POCO",
        "price": 10999,
        "category": "60ba004e79527eb5ca3ab71e",
        "countInStock": 10,
        "rating": 4,
        "isFeatured": true,
        "dateCreated": "2021-06-07T09:43:17.868Z",
        "__v": 0
    }
}


*/
