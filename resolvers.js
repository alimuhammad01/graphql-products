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
      products: async (parent, {offset, limit, minprice, maxprice, orderby}, { db }, info) => {
        const where = (minprice || maxprice) ?
            (minprice && maxprice) ?
              {price: {[Op.between] : [minprice, maxprice]}}
            :
            (minprice) ?
              {price: {[Op.gte]: minprice}}
              :
              {price: {[Op.lte]: maxprice}}  
        : {};
        const order  = (orderby == "ASC" || orderby == "DESC") ? orderby : 'ASC';
        const products = await db.Products.findAll({
          where: where,
          offset,
          limit,
          order: [['id', order]],
          raw: true
        });

        return products;
      },
      product: (parent, args, { db }, info) => db.Products.findByPk(args.id),
      orders: async (parent, {offset, limit}, { db }, info) => {
        
        const orders = await db.Orders.findAll({
          offset,
          limit
        });
        return orders;
      },
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
          const updateCustomer = await db.Customers.update({
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

          return {status: updateCustomer[0]}
        },
        deleteCustomer: async (parent, { id }, { db }, info) => {
          const deleted = await db.Customers.destroy({where: {id}});
          return {status: deleted}
        },
        // Order Mutations
        createOrder: async (parent, { created_date, delivery_date, total_cost, customer_id, products }, { db }, info) => {
          const customer = await db.Customers.findOne({id:customer_id}, { raw: true});
          if(!customer) {
            throw new Error('Invalid customer', 'customer_id');
            return;
          }
          const newOrder = await db.Orders.create({
            created_date,
            delivery_date,
            total_cost,
            CustomerId: customer_id,
            raw: true
          });
          products.forEach(async (p) => {
            await db.OrderProducts.create({
              ProductId: p.product_id,
              OrderId: newOrder.id,
              qty: p.qty
            })
          })
          return newOrder
        }
        ,
        updateOrder: async (parent, { id, created_date, delivery_date, total_cost, customer_id, products }, { db }, info) => {
          const order = await db.Orders.findOne({ where: {id}, raw: true});
          if(!order) {
            throw new Error('Invalid Order!', 'id');
            return;
          }
          const updateOrder = await db.Orders.update({
            created_date,
            delivery_date,
            total_cost,
            CustomerId: customer_id
          }, {
            where: {id},
            raw: true
          });

          await db.OrderProducts.destroy({ where : {OrderId: id}});

          products.forEach(async (p) => {
            await db.OrderProducts.create({
              ProductId: p.product_id,
              OrderId: newOrder.id,
              qty: p.qty
            })
          });

          return {status: updateOrder[0]}
        },
        deleteOrder: async (parent, { id }, { db }, info) => {
          const deleted = await db.Orders.destroy({where: {id}});
          return {status: deleted}
        }
      }
};