const express = require('express');
const bodyParser = require('body-parser');
const { payment, success, failure } = require('../Controller/PaymentController.js');

const apiRoute = express.Router();
apiRoute.use(bodyParser.json());
apiRoute.use(bodyParser.urlencoded({ extended: false }));

apiRoute.post('/payment', payment);
apiRoute.get('/success', success);
apiRoute.get('/failure', failure);

module.exports = { apiRoute };
