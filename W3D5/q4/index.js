const express = require('express');
const path = require("path");

const app = express();
app.use(express.urlencoded({extended: false}));
app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
    const date = new Date();
    const hour = date.getHours();
    const cssFile = hour >= 6 && hour <= 18 ? 'day.css' : 'night.css';
    res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Form</title>
            <link rel="stylesheet" href="/css/${cssFile}">
        </head>
        <body>
            <form action="/result" method="POST">
                <label for="name">Name</label>
                <input type="text" id="name" name="name">
                <label for="age">Age</label>
                <input type="text" name="age" id="age">
                <input type="submit" value="Submit">
            </form>
        </body>
        </html>`
    );
});

app.get('/output', (req, res) => {
    const {name, age} = req.query;
    res.send(`Hello  ${name} , ypur age is ${age} years old`);
})

app.post('/result', (req, res) => {
    const {name, age} = req.body;
    if(name && age)
    res.redirect(303, `/output?name=${name}&age=${age}`);
    else
    res.redirect(303, `/output?name=person&age=unknown`);
})

app.listen(80);