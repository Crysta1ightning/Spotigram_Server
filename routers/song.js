const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const songModel = require('../model/song.js');

const router = express.Router();

router.use(express.json());

// List
router.get('/', function (req, res, next) {
  const {searchtext} = req.query;
  songModel
    .list(searchtext)
    .then((songs) => {
      res.json(songs);
    })
    .catch(next);
});

module.exports = router;
