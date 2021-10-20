const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'salt for cookie signing'
}));

app.use((req, res, next) => {
    if (!req.session.list) {
        req.session.list = [];
    }
    next();
});

app.get('/', (req, res) => {
    res.render("list", {
        list: req.session.list
    });
});

app.get('/addUser', (req, res) => {
    res.render('UserForm');
});

app.post('/addUser', (req, res) => {
    req.session.list.push(req.body.item);
    res.redirect(303, '/');
});

app.listen(3000, () => {
    console.log("Server running at port 3000.");
});