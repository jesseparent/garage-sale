const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
//need actual test account for stripe
const { User, Product, Category, Order, Conversation } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};
            if (category) {
                params.category = category;
            };
            if (name) {
                params.name = {
                    $regex: name
                };
            }
            return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id)
                .populate('category')
                .populate('seller');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                }).populate({
                    path: 'seller.products',
                    populate: 'products',
                    populate: 'reviews'
                });
                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
                user.products.sort((a, b) => b.createdAt - a.createdAt);
                return user;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
                // .select('-__v -password')
                .populate('orders')
                .populate('reviews')
                .populate('products')
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await (await User.findById(context.user._id)).populated({
                    path: 'orders.products',
                    populate: 'category'
                });
                return user.orders._id(_id);
            }
            throw new AuthenticationError('Not logged in');
        },
        orders: async () => {
            return Order.find()
                .populate('products')
                .populate('seller')
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const { products } = await order.populate('products').execPopulate();
            const line_items = [];

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd'
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            };

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}`
            });
            return { session: session.id };
        },
        conversations: async (parent, args, context) => {
            if (context.user) {
                return await Conversation.find({ user: context.user._id });
            }
            throw new AuthenticationError('Not logged in');
        },
        specificProducts: async (parent, args) => {
           const { search = null, page = 1, limit= 20 } = args;
            const searchQuery = {
                $or: [
                { name: { $regex: search, $options: 'i'}},
                { description: { $regex: search, $options: 'i' }},
                { model: { $regex: search, $options: 'i'}}
                ]
            };
            console.log(search);

            const products =  await Product.find(searchQuery)
            .limit(limit)
            .skip((page-1) * limit)
            .lean();

            const count = await Product.countDocuments(searchQuery);

            return {
                products,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            }
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            if (context.user) {
                const order = new Order({ products });
                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
                return order;
            }
            throw new AuthenticationError('Not logged in');
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        addProduct: async (parent, args, context) => {
            if (context.user) {
                args['seller'] = context.user._id;
                const product = await Product.create(args);
                await User.findByIdAndUpdate(context.user._id, { $push: { products: product } });
                return product;
            }
            throw new AuthenticationError('Incorrect credentials');
        },
        addCategory: async (parent, args) => {
            const category = await Category.create(args);
            return category;
        },
        updateProduct: async (parent, args, context) => {
            if (context.user) {
                //const image = args.image;
                const product = await Product.findByIdAndUpdate(args._id,
                    { $set: { image: args.image } },
                    { new: true }
                );
                return product;
            }
            throw new AuthenticationError('invalid credentials');
        },
        addReview: async (parent, { sellerId, reviewBody }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: sellerId },
                    { $push: { reviews: { reviewBody, reviewer: context.user.firstName + " " + context.user.lastName } } },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('invalid credentials');
        },
        addConversation: async (parent, { user, withUser, messages }, context) => {
            if (context.user) {
                const conversation = await Conversation.findOneAndUpdate(
                    { user, withUser },
                    { messages },
                    { new: true, upsert: true }
                );
                return conversation;
            }
            throw new AuthenticationError('invalid credentials');
        },
        addContacts: async (parent, { contacts }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { contacts },
                    { new: true, runValidators: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('invalid credentials');
        }
    }
}

module.exports = resolvers;