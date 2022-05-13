const { Schema, model } = require('mongoose');

const orderStatuses = ['Pending', 'Processing', 'Completed'];

const orderSchema = new Schema(
  {
    user: {
      _id: {
        type: String,
      },
      email: {
        type: String,
        match: [/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/, 'Email is not valid!'],
      },
      firstName: {
        type: String,
        minLength: [3, 'First Name should be at least 3 characters long!'],
      },
      lastName: {
        type: String,
        minLength: [3, 'Last Name should be at least 3 characters long!'],
      },
      phoneNumber: {
        type: String,
        match: [/^0[1-9]{1}[0-9]{8}$/, 'Phone Number is not valid!'],
      },
      country: {
        type: String,
        minLength: [3, 'Country should be at least 3 characters long!'],
      },
      city: {
        type: String,
        minLength: [3, 'City should be at least 3 characters long!'],
      },
      street: {
        type: String,
        minLength: [3, 'Street should be at least 3 characters long!'],
      },
      streetNumber: {
        type: Number,
        min: [1, 'Street Number Street Number should be minimum 1!'],
      },
    },
    status: {
      type: String,
      enum: {
        values: orderStatuses,
        message: `Order status is one of the following: ${orderStatuses.join(', ')}.`,
      },
      default: orderStatuses[0],
    },
    paymentMethod: { type: String, required: [true, 'Payment method is required!'] },
    deliveryPrice: { type: Number, default: 0, min: [0, 'Delivery price should be positive number!'] },
    price: { type: Number, min: [1, 'Price should be positive number and greater than zero!'] },
    totalPrice: { type: Number, min: [1, 'Total Price should be positive number and greater than zero!'] },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
        selectedSize: {
          type: String,
        },
        selectedDough: {
          type: String,
        },
        selectedExtras: {
          type: Array,
        },
        gr: {
          type: Number,
          min: [1, 'Product weight should be positive number and greater than zero!'],
        },
        quantity: {
          type: Number,
          min: [1, 'Product quantity should be positive number and greater than zero!'],
        },
        price: {
          type: Number,
          min: [1, 'Taxes should be positive number and greater than zero!'],
        },
        totalPrice: {
          type: Number,
          min: [1, 'Taxes should be positive number and greater than zero!'],
        },
      },
    ],
    totalProducts: {
      type: Number,
      min: [1, 'Total Products should be positive number and greater than zero!'],
    },
  },
  { timestamps: true }
);

const orderModel = model('Order', orderSchema);

module.exports = {
  orderModel,
  orderStatuses,
};
