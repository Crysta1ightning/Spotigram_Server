const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const friendModel = require('../model/friend.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
    const {user_id} = req.query;
    friendModel
        .list(user_id)
        .then((friends) => {
        res.json(friends);
        })
        .catch(next);
});

// Create
router.post('/', function (req, res, next) {
    const { user1_id, user2_id } = req.body;
    if (!user1_id || !user2_id) {
      const err = new Error('user1_id and user2_id is required');
      err.status = 400;
      throw err;
    }
    friendModel
      .create(user1_id, user2_id)
      .then((friends) => {
        res.json(friends);
      })
      .catch(next);
});
  

module.exports = router;
