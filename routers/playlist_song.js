const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const playlist_songsModel = require('../model/playlist_song.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
    const {playlist_id} = req.query;
    playlist_songsModel
        .list(playlist_id)
        .then((playlist_songs) => {
        res.json(playlist_songs);
        })
        .catch(next);
});

// Create
router.post('/', function (req, res, next) {
    const { playlist_id, song_id } = req.body;
    if (!playlist_id || !song_id) {
      const err = new Error('playlist_id and song_id is required');
      err.status = 400;
      throw err;
    }
    playlist_songsModel
      .create(playlist_id, song_id)
      .then((playlist_songs) => {
        res.json(playlist_songs);
      })
      .catch(next);
});
  

module.exports = router;
