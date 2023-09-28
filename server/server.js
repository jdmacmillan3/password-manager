require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const db = require ('./db');

app.get(`/`, (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});