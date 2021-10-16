const express = require('express');
const app = express();
app.get('/', (req, res) => {  
    let name = req.query.name;  
    let age = req.query.age;  
    if (!name) {    
    name = "person";
    }
    if(!age){
        age = "unknown";
    }
res.send(`Hello  ${name} , ypur age is ${age} years old`);
});
app.listen(80);