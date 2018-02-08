import User from '../../models/user.model';
import Product from '../../models/product.model';

export const resolvers = {
  Query: {
    products: () => Product.find({}),
    getUser: (_, { useruuid }) => User.findOne('useruuid', useruuid),
  },
};
