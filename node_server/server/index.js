const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');

const { NotFoundError } = require("../helpers/errors");
const authRouter = require('../routes/authRouter');
const apiRouter = require('../routes/apiRouter');
require("../db");
config();

const app = express();

const server = (config) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //allow requests from frontend using cors
    app.use(cors());

    //allow all api routes to use our api Router
    app.use('/api', apiRouter);
    app.use("/auth", authRouter);

    app.get("/", (req, res) => {
        res.send("Craftsmaid Backend apis here");
    })

    // throw an error if the path cannot be found
    app.all("*", (_res) => {
        throw new NotFoundError("Resource not found on this server");
    })

    return app;
}

module.exports = server;