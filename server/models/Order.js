const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: [/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/, 'Email is not valid!'],
    },
    firstName: {
      type: String,
      minLength: [3, 'First Name should be at least 3 characters long!'],
    },
    lastName: {
      type: String,
      default: 'last name',
      minLength: [3, 'Last Name should be at least 3 characters long!'],
    },
    phoneNumber: {
      type: String,
      match: [/^0[1-9]{1}[0-9]{8}$/, 'Phone Number is not valid!'],
    },
    address: {
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
  },
  { timestamps: true }
);

module.exports = model('Order', orderSchema);
