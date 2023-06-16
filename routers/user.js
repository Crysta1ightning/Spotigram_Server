const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

// const postModel = require('../model/posts.js');
// const voteModel = require('../model/votes.js');

const router = express.Router();

router.use(express.json());
router.get('/', function(req, res) {
    res.json("Get User Here~");
})
// // List
// router.get('/', function (req, res, next) {
//   const { searchText, start } = req.query;
//   postModel
//     .list(searchText, start)
//     .then((posts) => {
//       res.json(posts);
//     })
//     .catch(next);
// });

// // Create
// router.post('/', function (req, res, next) {
//   const { mood, text } = req.body;
//   if (!mood || !text) {
//     const err = new Error('Mood and text are required');
//     err.status = 400;
//     throw err;
//   }
//   postModel
//     .create(mood, text)
//     .then((post) => {
//       res.json(post);
//     })
//     .catch(next);
// });

// // Vote
// router.post(
//   '/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes',
//   function (req, res, next) {
//     const { id, mood } = req.params;
//     if (!id || !mood) {
//       const err = new Error('Post ID and mood are required');
//       err.status = 400;
//       throw err;
//     }
//     voteModel
//       .create(id, mood)
//       .then((post) => {
//         res.json(post);
//       })
//       .catch(next);
//   }
// );

module.exports = router;
