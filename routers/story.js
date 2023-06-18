const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const storyModel = require('../model/story.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
  storyModel
    .list()
    .then((story) => {
      res.json(story);
    })
    .catch(next);
});

router.post('/', function (req, res, next) {
  const {user_id, song_id} = req.body;
  if (!user_id || !song_id) {
    const err = new Error('user_id and song_id are required');
    err.status = 400;
    throw err;
  }
  storyModel
    .create(user_id, song_id)
    .then((story) => {
      res.json(story);
    })
    .catch(next);
});

router.delete('/', function (req, res, next) {
  storyModel
    .refresh()
    .then((story) => {
      res.json(story);
    })
    .catch(next);
});

module.exports = router;
