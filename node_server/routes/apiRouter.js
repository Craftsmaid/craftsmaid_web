const express = require('express');
const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
    res.send('api calls here');
})


module.exports = apiRouter;