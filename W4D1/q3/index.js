// npm run dev - to run nodemon
const express = require('express'); 
const path = require('path');
const app = express();

const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use(express.urlencoded({ extended: false }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'salt for cookie signing'
}));

const productList = [
    { id: 1, name: 'Laptop', price: 800 },
    { id: 2, name: 'Mobile', price: 750 },
    { id: 3, name: 'Mouse', price: 30 },
    { id: 4, name: 'Monitor', price: 120 },
    { id: 5, name: 'Keyboard', price: 20 },
    { id: 6, name: 'Joystick', price: 300 },
    { id: 7, name: 'JOystick', price: 300 },
    { id: 8, name: 'product', price: 300 }
];
app.use((req, res, next) => {
    if (!req.session.cart)
        req.session.cart = [];
    next();
});

app.get('/', (req, res) => {
    res.render("product", {
        productList: productList
    });
});

app.get('/cartList', (req, res) => {
    res.render("shoppingcart", {
        cartList: req.session.cart
    });
});

let isPresent;
app.post('/addToCart', (req, res) => {
    let carts = req.session.cart;
    isPresent = false;
    for (let c in carts) {
        if (carts[c]['name'] == req.body.name) {
            carts[c]['price'] += parseFloat(req.body.price);
            carts[c]['quantity']++;
            isPresent = true;
        }
    }
    if (!isPresent) {
        req.session.cart.push({
            name: req.body.name,
            price: parseFloat(req.body.price),
            quantity: 1
        });
    }
    res.redirect(303, '/cartList');
});

app.listen(3000, () => {
    console.log("Server running at port 3000.");
});