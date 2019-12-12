const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    Customer: {
      orders: (parent, args, context, info) => parent.getOrders(),
    },
    Order: {
      customer: (parent, args, context, info) => parent.getCustomer(),
      products: async (parent, args, { db }, info) => {
        const orderProducts = await db.OrderProducts.findAll({
          attributes: ['qty'],
          where: {OrderId: parent.id},
          include: { model: db.Products}
        });
        const orderProductsObject = JSON.parse(JSON.stringify(orderProducts));
        const products = orderProductsObject.map((product) => {
          return {qty: product.qty, ...product.Product};
        });
        return products;
      },
    },
    Query: {
      products: (parent, args, { db }, info) => db.Products.findAll(),
      product: (parent, args, { db }, info) => db.Products.findByPk(args.id),
      orders: (parent, args, { db }, info) => db.Orders.findAll(),
      customer: (parent, args, { db }, info) => db.Customers.findByPk(args.id),
    },
    Mutation: {
      createProduct: (parent, { name, description, price, status }, { db }, info) => 
        db.Products.create({
          name,
          description,
          price,
          status
        })
        ,
        updateProduct: async (parent, { id, name, description, price, status }, { db }, info) => {
          const product = await db.Products.update({
            name,
            description,
            price,
            status
          },{
            where: {id}
          });
          return {status: product[0]};
        },
        deleteProduct: async (parent, { id }, { db }, info) => {
          const deleted = await db.Products.destroy({where: {id}});
          return {status: deleted}
        },
        // Custormer mutations
        createCustomer: async (parent, { name, email, street_address, city, state, zip_code, country }, { db }, info) => {
          const customer = await db.Customers.findOne({ where: {email}, raw: true});
          if(customer) {
            throw new Error('Email already taken', 'email');
            return;
          }
          const newCustomer = await db.Customers.create({
            name,
            email,
            street_address,
            city,
            state,
            zip_code,
            country,
            raw: true
          });

          return newCustomer
        }
        ,
        updateCustomer: async (parent, { id, name, email, street_address, city, state, zip_code, country }, { db }, info) => {
          const customer = await db.Customers.findOne({ where: {email, id: {[Op.ne]: id}}, raw: true});
          if(customer) {
            throw new Error('Email already taken', 'email');
            return;
          }
          const newCustomer = await db.Customers.update({
            name,
            email,
            street_address,
            city,
            state,
            zip_code,
            country
          }, {
            where: {id},
            raw: true
          });

          return {status: newCustomer[0]}
        },
        deleteCustomer: async (parent, { id }, { db }, info) => {
          const deleted = await db.Customers.destroy({where: {id}});
          return {status: deleted}
        }
      }
};