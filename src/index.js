//Config Require
const express = require('express');
const { v4: uuidv4 } = require("uuid")

//Initializaition
const app = express();

//Middlewares
app.use(express.json())

const customers = []

//Routes
app.post("/account", (req, res) => {
    const { cpf, name } = req.body

    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if (customerAlreadyExists) {
        return res.status(400).json({ error: "Customer already exists!" })
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return res.status(201).send();
})

app.get("/statement", (req, res) => {
    const { cpf } = req.headers;

    const customer = customers.find(customer => customer.cpf === cpf)
    
    if(!customer){
        return res.status(400).json({error: "Customer Not Found!"})
    }

    return res.json(customer.statement);
})
app.get("/statement/:cpf", (req, res) => {
    const { cpf } = req.params;

    const customer = customers.find(customer => customer.cpf === cpf)
    
    if(!customer){
        return res.status(400).json({error: "Customer Not Found!"})
    }

    return res.json(customer.statement);
})

//Port
app.listen(3333)