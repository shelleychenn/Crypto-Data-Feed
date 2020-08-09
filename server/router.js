const router = require('express').Router();
const controller = require('./controller');

router.get('/price/:symbol/:timeInterval', controller.get);

module.exports = router;
