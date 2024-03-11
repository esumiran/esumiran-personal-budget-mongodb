const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const budgetModel = require("./models/budget_model");

const fs = require('fs');
const port = 3000;

const budget = require('./doughnut.json');

app.use('/', express.static('public'));

let url = 'mongodb://localhost:27017/personal-budget';

app.use(cors());
app.use('/' , express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to database"))
    .catch((connectionError) => console.error(connectionError));

app.get('/budget', (req, res) => {
    budgetModel.find({})
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("An error occurred");
        });
});




    app.post("/addbudget", (req, res) => {

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                // Insertion operation
                console.log("connected to database for data insertion");
                let newData = new budgetModel(req.body);
                budgetModel.insertMany(newData)
                    .then((data) => {
                        res.send("Data Inserted Successfully")
                        mongoose.connection.close();
                    })
                    .catch((connectionError) => {
                        console.log(connectionError)
                        res.send(connectionError.message)
                    })
            })
            .catch((connectionError) => {
                console.log(connectionError)
                res.send(connectionError);
            })
    })


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});