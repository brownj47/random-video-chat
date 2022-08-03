const express = require('express');
const router = express.Router();
const userRoutes = require("./userRoutes")
const gobbleRoutes = require("./gobbleRoutes")

router.use("/users",userRoutes)
router.use("/gobbles",gobbleRoutes)

module.exports = router;