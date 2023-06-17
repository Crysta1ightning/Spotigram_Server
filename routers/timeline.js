const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const timelineModel = require('../model/timeline.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
    timelineModel
        .list()
        .then((timeline) => {
            res.json(timeline);
        })
        .catch(next);
});

//create


module.exports = router;