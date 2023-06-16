const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const playlistModel = require('../model/playlist.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
  playlistModel
    .list()
    .then((playlists) => {
      res.json(playlists);
    })
    .catch(next);
});

// Create
router.post('/', function (req, res, next) {
    const { playlistname } = req.body;
    if (!playlistname) {
      const err = new Error('playlistname is required');
      err.status = 400;
      throw err;
    }
    playlistModel
      .create(playlistname)
      .then((playlists) => {
        res.json(playlists);
      })
      .catch(next);
  });
  

module.exports = router;
