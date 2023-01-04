const express = require('express');

const categoryRouter =express.Router();


var categoryController  = require('../controllers/category.controller');

categoryRouter.post('/add', categoryController.add);
categoryRouter.get('/list', categoryController.list);
categoryRouter.get('/:id', categoryController.getById);
categoryRouter.delete('/:id', categoryController.deletebyId);
categoryRouter.put('/:id', categoryController.updateById);

module.exports = categoryRouter;