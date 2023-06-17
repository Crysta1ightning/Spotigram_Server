const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const listsongModel = require('../model/playlist_song.js');

const router = express.Router();

router.use(express.json());