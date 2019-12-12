module.exports = `
  scalar DateTime

  type Date {
    iso8601: DateTime!
    # unix timestamp in milliseconds
    timestamp: String!
    # yyyymmdd: date formatted as 2019-01-01
    yyyymmdd: String!
    # {DATE_RSS} from EE
    rss: String!
  }
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float
    status: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type Customer {
    id: ID!
    name: String!
    email: String!
    street_address: String
    city: String
    state: String
    zip_code: String
    country: String
    orders: [Order!]
  }
  type Order {
    id: ID!
    customer: Customer
    created_date: Date
    delivery_date: Date
    total_cost: Float
    status: String
  }
  type Query {
    products: [Product!]!
    product(id: ID!): Product
    orders: [Order!]!
    customer(id: ID!): Customer!
  }

  type Mutation {
    createProduct(name:String!, description:String!, price:Float!, status:Boolean!): Product
  }
  
`;