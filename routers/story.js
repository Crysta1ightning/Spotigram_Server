const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const storyModel = require('../model/story.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
  const {user_id} = req.query;
  storyModel
    .list(user_id)
    .then((story) => {
      res.json(story);
    })
    .catch(next);
});

module.exports = router;
