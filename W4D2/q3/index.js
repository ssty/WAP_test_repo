const express = require('express'); // npm run dev - to run nodemon
const path = require('path');
const app = express();

const session = require('express-session');

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'view', 'js')));

app.use(express.urlencoded({ extended: false }));

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

app.use(session({
    secret: 'salt123',
    cookie: { maxAge: 600000 },
    resave: false,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    if (!req.session.cart)
        req.session.cart = [];
    next();
});

app.get('/', (req, res) => {
    res.render("product", {
        productList: productList,
        'productCount': req.session.cart.length
    });
});

app.get('/productDetail/:id', (req, res) => {
    res.render('productSingle', {
        'product': productList.find(p => p.id == req.params.id)
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
    // res.send(200);
    return res.send(200, { result: req.session.cart.length });
    res.end();
    // res.redirect(303, '/cartList');
});

app.listen(3000, () => {
    console.log("Server running at port 3000.");
});