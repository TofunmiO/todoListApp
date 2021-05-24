const express = require('express')

const app = express()

const port = 8000;

app.get('/', (req,res) => {
    res.send("Hello World")
});

app.get('/api/v1', (req,res) => {
    res.send("Accessing API version v1")
});

app.listen(port, () => {
    console.log(`Started on port: ${port}`)
})