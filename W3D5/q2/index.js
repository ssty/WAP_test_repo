const express = require('express');
const app = express();
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send('<form action="/result" method="POST"> ' +
                '<label for="name">Name</label> ' +
                '<input type="text" id="name" name="name"> ' +
                '<label for="age">Age</label> ' +
                '<input type="text" name="age" id="age"> ' +
                '<input type="submit" value="Submit"> ' +
                '</form>');
});

app.post('/result', (req, res) => {
    const {name, age} = req.body;
    res.send(`Hello  ${name} , ypur age is ${age} years old`}`);
})

app.listen(80);