var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
schema {
    query: Query
}
  
type Query {
    products: [Product]
}

type Product {
    id: Int
    name: String
    price: Int
    sku: String
    related_products: [Product]
}
`);

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

// The root provides a resolver function for each API endpoint
let root = {
    products: (root, args, context, info) => {
        return get_products(args.query.size)
    },
};

let app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(8080);
console.log('Running a GraphQL API server at http://localhost:8080/');