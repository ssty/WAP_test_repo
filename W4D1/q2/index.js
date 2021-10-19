const express = require('express');
const session = require('express-session');
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'salt for cookie signing'
}));

app.use((req, res, next) => {
    if (!req.session.data)
        req.session.data = {};
    next();
});

app.get('/', (req, res) => {
    res.render('form');
});

app.get('/output', (req, res) => {
    res.send(`Hello ${req.session.data['name']}, your age is ${req.session.data['age']}`);
})

app.post('/result', (req, res) => {
    let { name, age } = req.body;
    if (!name) name = 'Unknown';
    if (!age) age = 'Unknown';
    req.session.data['name'] = name;
    req.session.data['age'] = age;
    res.redirect(303, '/output');
})

app.listen(3000, () => {
    console.log('Server running at port 3000...');
});