const express = require('express');
const app = express();
require('dotenv').config()

const db = require("./db")
const Product = require('./db/models/product');
const WasteComposition = require('./db/models/wasteComposition');
const ProductForReview = require('./db/models/productForReview');
const cors = require('cors');
const productForReview = require('./db/models/productForReview');
const favicon = require('serve-favicon')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000;

app.use(favicon(__dirname + '/favicon.ico'))

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.get("/review", (req, res) => {
  res.sendFile(__dirname + '/pages/review.html')
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
                product.wasteComposition = newWasteComposition;
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

app.get('/api/v1/products_for_review/', (req, res) => {
    ProductForReview.find({},(err, response) => {
        if (err) return err;
        res.json(response);
    })
})

app.post("/api/v1/products_for_review/", (req, res) => {

    let product = new ProductForReview(req.body);

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

app.delete('/api/v1/products_for_review/:id', (req, res) => {
    productForReview.findOneAndDelete({gtin: req.params.id}, (err, product) => {
        if (err) return err;
        if (product)
            res.json({
                code: 200,
                message: `Product with gtin ${req.params.id} successfully deleted`,
                data: null
            })
        else 
            res.json({
                code: 404,
                message: `There was a problem deleting product with gtin ${req.params.id}`,
                data: null
            })
    })

})

app.get('/api/v1/products/', (req, res) => {
    Product.find({},(err, response) => {
        if (err) return err;
        res.json(response);
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
