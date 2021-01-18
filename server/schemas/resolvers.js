const { Authenticationerror, AuthenticationError } = require('apollo-server-express');
const { async } = require('rxjs');
const { User, Product, Category, Specifications, Order } = require('../models');
const { signToken }  = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};
            if(category) {
                params.category = category;
            };
            if(name) {
                params.name = {
                    $regex:name
                };
            }
            return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id)
            .populate('category')
            .populate('user');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(_id).populate({
                    path: 'orders.products',
                    populate: 'category'
                }).populate({
                    path: 'seller.products',
                    populate: 'products',
                    populate: 'specification'
                });
                user.orders.sort((a,b) => b.purchaseDate - a.purchaseDate);
                user.products.sort((a,b) => b.createdAt - a.createdAt);
                return user;
            }
            throw new AuthenticationError('Not logged in');
        },
        order: async (parent, {_id }, context) => {
            if(context.user) {
                const user = await (await User.findById(context.user._id)).populated({
                    path: 'orders.products',
                    populate: 'category'
                });
                return user.orders._id(_id);
            }
            throw new AuthenticationError('Not logged in');
        },
        checkout: async (parent, args, context)=> {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({products: args.products});
            const { products } = await order.populate('products').execPopulate();
            const line_items = [];

            //when we decide on our ecommerce solution, we need to update this
        },
        //we also need a session
        Mutation: {
            addUser: async (parent, args) => {
                const user = await User.create(args);
                const token = signToken(user);
                return { token, user };
            }
        }
    }
}

module.exports = resolvers;