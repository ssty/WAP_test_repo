const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));
app.use(session({secret: 'secretsalt over here'}));
app.use('/js', express.static(path.join(__dirname, 'view', 'js')));

let products = {
    0: {
        name: 'chips',
        price: 3
    },
    1: {
        name: 'chocolate',
        price: 2
    },
    2: {
        name: 'coca-cola',
        price: 1
    }
};


app.get('/', (req, res) => {
    const products = req.session.cart ? req.session.cart : {};
    res.render('cart.ejs', { products: products });
});

app.post('/addToCart', (req, res) => {
    const cart = req.session.cart ? req.session.cart : {};
    let id = parseInt(req.body.id);
    if (!cart[id]) {
        cart[id] = {
            quantity: 0
        };//initialize
    }
    cart[id].name = req.body.name;
    cart[id].price = parseInt(req.body.price);
    cart[id].quantity += parseInt(req.body.qty);

    req.session.cart = cart;

    res.end();
});

app.get('/product', (req, res) => {
    if (!(req.query.id in products)) {
        res.redirect(404, '/notfound')
    }
    const product = products[req.query.id];
    res.render('products.ejs', {
        id: req.query.id,
        name: product.name,
        price: product.price
    });
});

app.get('/notfound', (req,res) =>{
    res.send("Product not found");
})

app.get('/count', (req,res) =>{
    let count = 0;
    if (req.session.cart) {
        for (let pid in req.session.cart) {
            count += req.session.cart[pid].qty;
        }
    }
    res.send('' + count);
});

app.listen(80);