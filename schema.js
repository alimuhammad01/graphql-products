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
    order: Order
    name: String!
    description: String
    price: Float
    status: Boolean
    createdAt: Date
    updatedAt: Date
    qty: String
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
    products: [Product!]!
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

  type MutationResponse {
    status: Boolean
  }
  

  type Mutation {
    createProduct(name:String!, description:String!, price:Float!, status:Boolean!): Product!
    updateProduct(id: ID!, name:String!, description:String!, price:Float!, status:Boolean!): MutationResponse
    deleteProduct(id: ID!): MutationResponse
  }
  
`;