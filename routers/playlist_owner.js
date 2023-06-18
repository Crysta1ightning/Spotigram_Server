const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const playlist_ownersModel = require('../model/playlist_owner.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
    const {playlist_id} = req.query;
    playlist_ownersModel
        .list(playlist_id)
        .then((playlist_owners) => {
        res.json(playlist_owners);
        })
        .catch(next);
});

// Create
router.post('/', function (req, res, next) {
    const { playlist_id, user_id } = req.body;
    if (!playlist_id || !user_id) {
      const err = new Error('playlist_id and user_id is required');
      err.status = 400;
      throw err;
    }
    playlist_ownersModel
      .create(playlist_id, user_id)
      .then((playlist_owners) => {
        res.json(playlist_owners);
      })
      .catch(next);
});
  

module.exports = router;
