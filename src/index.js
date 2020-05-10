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

function get_product() {
    return {
        "id": Math.random(),
        "name": Math.random(),
        "price": Math.random(),
        "sku": Math.random(),
    }
}

let products = [];
for (i=0; i<1000; i++) {
    let product = get_product()
    product["related_products"] = []
    for (k=0; k<4; k++) {
        product["related_products"].push(get_product())
    }
    products.push(product)
}

// The root provides a resolver function for each API endpoint
let root = {
    products: () => {
        return products
    },
};

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(8080);
console.log('Running a GraphQL API server at http://localhost:8080/graphql');