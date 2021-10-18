const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));

var globalCart;
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

const cartProductList = [
    { name: 'Samsung', price: 2250, quantity: 3 },
    { name: 'MAC', price: 4000, quantity: 2 },
    { name: 'Product', price: 123, quantity: 1 },
    { name: 'Test ', price: 1234, quantity: 4 }];


app.get('/', (req, res) => {
    res.render("product", {
        productList: productList
    });
});

app.get('/cart', (req, res) => {
    res.render('shoppingcart.ejs', {
        cartProductList: cartProductList

    });
});

app.post('/cart', (req, res) => {
    res.render("shoppingcart", {
        cartProductList: cartProductList
    });
});


app.listen(90);