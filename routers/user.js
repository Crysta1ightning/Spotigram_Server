const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const userModel = require('../model/user.js');
// const voteModel = require('../model/votes.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
  userModel
    .list()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

// Create
router.post('/', function (req, res, next) {
  const { username, encoded_pwd } = req.body;
  if (!username || !encoded_pwd) {
    const err = new Error('username and encoded_pwd are required');
    err.status = 400;
    throw err;
  }
  userModel
    .create(username, encoded_pwd)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

module.exports = router;
