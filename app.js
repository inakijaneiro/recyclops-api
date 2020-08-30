const express = require('express');
const app = express();
require('dotenv').config()

const db = require("./db")
const Product = require('./db/models/product');
const WasteComposition = require('./db/models/wasteComposition');
const wasteComposition = require('./db/models/wasteComposition');

app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/api/v1/products/:id", (req, res) => {

    Product.findOne({
        gtin: req.params.id
    }, (err, product) => {
        if (err) return err;
        let newWasteComposition = [];
        if (product) {

            let resolvedResultPromises = [];
            product.wasteComposition.forEach(wasteComposition => {
                resolvedResultPromises.push(
                    WasteComposition.findOne({name: wasteComposition.name}).then(completeWasteComposition => {
                        newWasteComposition.push(completeWasteComposition);
                    })
                )
            })

            Promise.all(resolvedResultPromises).then(() => {
                console.log(JSON.stringify(newWasteComposition));
                product.wasteComposition = newWasteComposition;
                console.log(product)
                res.json({
                    code: 200,
                    message: "Product was found!",
                    data: product
                });
            })
        }
        else {
            res.json({
                code: 404,
                message: "Product not found",
                data: null
            })
        }
    })
})

app.post("/api/v1/products/", (req, res) => {

    let product = new Product(req.body);

    product.save()
    .then(() => {
        res.send(`Product ${req.body.name} inserted successfully`)
    })
    .catch(err => res.json({
        code: 409,
        message: `${err}`,
        data: null
    }));
})

app.get("/api/v1/waste_compositions/", (req, res) => {

    WasteComposition.find({},(err, response) => {
        if (err) return err;
        res.json(response);
    })
})

app.post("/api/v1/waste_compositions/", (req, res) => {

    let product = new WasteComposition(req.body);

    product.save()
    .then(() => {
        res.send(`Waste composition ${req.body.name} inserted successfully`)
    })
    .catch(err => res.json({
        code: 409,
        message: `${err}`,
        data: null
    }));
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})