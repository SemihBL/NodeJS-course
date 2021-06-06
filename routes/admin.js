const express = require('express');
const router = express.Router();
const path = require('path');
const adminController = require('../controllers/admin')

router.get('/products', adminController.getPrds);

router.get('/addPrd', adminController.GETaddPrd);

router.post('/addPrd', adminController.POSTaddPrd);

router.get('/editPrd/:productid', adminController.GETeditPrd);

router.post('/editPrd', adminController.POSTeditPrd);

router.get('/deletePrd/:productname', adminController.GETdeletePrd);

router.post('/deletePrd', adminController.POSTdeletePrd);

module.exports = router;
