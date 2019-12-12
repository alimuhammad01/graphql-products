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
      }
};