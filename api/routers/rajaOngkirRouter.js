const express = require('express')
const Router = express.Router()

// Import All Controller
const {rajaOngkirController} = require('../controllers') // Akan otomatis mengambil file index.js nya

Router.get('/get-province', rajaOngkirController.getProvince)
Router.get('/get-city', rajaOngkirController.getCity)
Router.post('/get-shipping-cost', rajaOngkirController.getShippingCost)

module.exports = Router