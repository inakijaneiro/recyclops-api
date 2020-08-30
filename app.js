const express = require('express');
const app = express();
require('dotenv').config()

const db = require("./db")
const Product = require('./db/models/product');
const cors = require('cors')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendfile('./index.html')
})

app.get("/api/v1/products/:id", (req, res) => {

    Product.findOne({
        gtin: req.params.id
    }, (err, obj) => {
        if (err) return err;
        if (obj)
            res.json({
                code: 200,
                message: "Product was found!",
                data: obj
            });
        else
            res.json({
                code: 404,
                message: "Product not found",
                data: null
            })
    })
})

app.post("/api/v1/products/", (req, res) => {

    let product = new Product(req.body);

    product.save()
    .then(() => {
        res.json({
          code: 201,
          message: `Product ${req.body.name} inserted successfully`,
          data: null
        })

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
