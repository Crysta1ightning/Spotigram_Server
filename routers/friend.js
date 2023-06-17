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
// router.post('/', function (req, res, next) {
//     const { playlistname } = req.body;
//     if (!playlistname) {
//       const err = new Error('playlistname is required');
//       err.status = 400;
//       throw err;
//     }
//     playlistModel
//       .create(playlistname)
//       .then((playlists) => {
//         res.json(playlists);
//       })
//       .catch(next);
// });
  

module.exports = router;
