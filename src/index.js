//Config Require
const express = require ('express');

//Initializaition
const app = express();

//Middlewares
app.use(express.json())

//Port
app.listen(3333)