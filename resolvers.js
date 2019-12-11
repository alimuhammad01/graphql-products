module.exports = {
    Query: {
      products: (parent, args, { db }, info) => db.Products.findAll(),
      product: (parent, args, { db }, info) => db.Products.findOne({id: args.id})
    },
    Mutation: {
      createProduct: (parent, { name, description, price, status }, { db }, info) => 
      db.Products.create({
        name,
        description,
        price,
        status
      })
    }

};