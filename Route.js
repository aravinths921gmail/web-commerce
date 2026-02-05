const express = require("express");
const router = express.Router();

const {postData} = require("./crud");

router.post("postData", postData);

