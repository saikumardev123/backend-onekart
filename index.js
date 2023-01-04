// loading of modules
const express = require('express');
const dotenv = require('dotenv');
const swaggerDocs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// Express App Creation
const app = express();
const cors = require('cors');


// middlewares 
app.use(express.json());
app.use(cors());

dotenv.config();

// user defined modules 
var db = require('../onekart-backend/utilities/db.config');
var userRouter = require('../onekart-backend/routes/user.route');
var categoryRouter = require("../onekart-backend/routes/category.route");
var productRouter = require("../onekart-backend/routes/product.route");
var orderRouter = require("../onekart-backend/routes/order.route");
var razorpayRouter = require("./routes/razorpay.route");

db.connectToDB();


var swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "ECommerce API",
      description: "Customer API Information",
      contact: {
        name: "Sai Kumar"
      },
      servers: ["http://localhost:8089"]
    }
  },
  apis: ['index.js']
};

// Routes Configuration
app.use(`${process.env.API_URL}/user`, userRouter);
app.use(`${process.env.API_URL}/category`, categoryRouter);
app.use(`${process.env.API_URL}/product`, productRouter);
app.use(`${process.env.API_URL}/order`, orderRouter);
app.use(razorpayRouter);


const sDocs = swaggerDocs(swaggerOptions);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(sDocs));




// http://localhost:portno/api/v1.0.0/healthcheck

/**
 * @swagger
 * /healthcheck:
 *  get:
 *    description: "This is a healthcheck api"
 *    responses:
 *      '200': 
 *         description: Success
 */
app.get(`/healthcheck`, (req, res) => {
  res.send("<img src='https://media.makeameme.org/created/its-working-oyy433.jpg'>");
})

app.listen(process.env.PORT, () => {
  console.log("Server started on port" + process.env.PORT);
})

// http://localhost:8089/api/v1.0.0/user/register

