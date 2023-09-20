const express = require('express');
const app = express();
const PORT = 5001

app.get(`/`, (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
});