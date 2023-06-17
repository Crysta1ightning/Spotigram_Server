const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const ownerModel = require('../model/playlist_owner.js');

const router = express.Router();

router.use(express.json());