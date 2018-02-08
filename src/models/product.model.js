import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { slugify } from '../utils/slugify';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, 'Product title must be at least 3 characters long.'],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [3, 'Product description must be at least 3 characters long.'],
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    stock: {
      type: Number,
      required: false,
      default: 1,
    },
  },
  { timestamps: true },
);

ProductSchema.plugin(uniqueValidator, {
  message: '{VALUE} already exists!',
});

ProductSchema.pre('validate', function(next) {
  this.makeSlug();

  next();
});

ProductSchema.statics = {
  createProduct(args, useruuid) {
    return this.create({
      ...args,
      createdBy: useruuid,
    });
  },

  getProductsByCategory(category) {
    return this.find({ category });
  },
};

ProductSchema.methods = {
  makeSlug() {
    this.slug = slugify(this.title);
  },
};

ProductSchema.index({ title: 'text', description: 'text' });
const Product = mongoose.model('Product', ProductSchema);

export default Product;
