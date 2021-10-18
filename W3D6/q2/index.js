const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,"view"));


app.get('/', (req, res) => {
    res.render("index");
});

app.post('/result', (req, res) => {
    const {name, age} = req.body;
    res.send(`Hello  ${name} , your age is ${age} years old`)
});


app.listen(3000);