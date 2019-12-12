module.exports = `
  type Product {
    id: ID!
    order: Order
    name: String!
    description: String
    price: Float
    status: Boolean
    createdAt: String
    updatedAt: String
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
    created_date: String
    delivery_date: String
    total_cost: Float
    status: String
  }
  
  input OrderProduct {
    product_id: ID!
    qty: Int!
  }
  
  type Query {
    products(offset: Int, limit: Int, minprice:Float, maxprice: Float, orderby: String, search_kw: String): [Product!]!
    product(id: ID!): Product
    orders(offset: Int, limit: Int, minprice:Float, maxprice: Float): [Order!]!
    customer(id: ID!): Customer!
  }

  type MutationResponse {
    status: Boolean
  }
  

  type Mutation {
    createProduct(name:String!, description:String!, price:Float!, status:Boolean!): Product!
    updateProduct(id: ID!, name:String!, description:String!, price:Float!, status:Boolean!): MutationResponse
    deleteProduct(id: ID!): MutationResponse
    # Customer Mutations
    createCustomer(name:String!, email:String!, street_address:String!, city:String, state:String, zip_code:String, country:String): Customer!
    updateCustomer(id: ID!, name:String!, email:String!, street_address:String!, city:String, state:String, zip_code:String, country:String): MutationResponse
    deleteCustomer(id: ID!): MutationResponse
    # Order Mutations
    createOrder(created_date:String!, delivery_date:String!, total_cost:Float!, customer_id:Int!, products:[OrderProduct!]!): Order!
    updateOrder(id: ID!, created_date:String!, delivery_date:String!, total_cost:Float!, status:String!, customer_id:Int!): MutationResponse
    deleteOrder(id: ID!): MutationResponse
  }
  
`;