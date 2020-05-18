var express = require('express');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function get_product() {
    return {
        "id": getRandomInt(5000000),
        "name": getRandomInt(5000000),
        "price": getRandomInt(5000000),
        "sku": getRandomInt(5000000),
    }
}

function get_products(size) {
    let products = []
    for (i=0; i<size; i++) {
        let product = get_product()
        product["related_products"] = []
        for (k=0; k<4; k++) {
            product["related_products"].push(get_product())
        }
        products.push(product)
    }
    return products
}

let app = express();
app.get('/', async function (req, res) {
    let size = req.query.size
    let products = get_products(size)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(products));
});
app.listen(8080);
console.log('Running a GraphQL API server at http://localhost:8080/');