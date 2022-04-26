const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const { rounds } = require('../config/config');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      match: [/^[A-Za-z0-9_\.]+@[A-Za-z]+\.[A-Za-z]{2,3}$/, 'Email is not valid!'],
    },
    firstName: {
      type: String,
      default: 'first name',
      minLength: [3, 'First Name should be at least 3 characters long!'],
    },
    lastName: {
      type: String,
      default: 'last name',
      minLength: [3, 'Last Name should be at least 3 characters long!'],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, 'Password should be at least 4 characters long!'],
    },
    image: {
      _id: { type: String, default: '' },
      url: { type: String, default: '' },
    },
    role: {
      type: String,
      enum: ['Member', 'Admin'],
      default: 'Member',
    },
    phoneNumber: {
      type: String,
      default: '0888888888',
      match: [/^0[1-9]{1}[0-9]{8}$/, 'Phone Number is not valid!'],
    },
    address: {
      country: {
        type: String,
        default: 'country',
        minLength: [3, 'Country should be at least 3 characters long!'],
      },
      city: {
        type: String,
        default: 'city',
        minLength: [3, 'City should be at least 3 characters long!'],
      },
      street: {
        type: String,
        default: 'street',
        minLength: [3, 'Street should be at least 3 characters long!'],
      },
      streetNumber: {
        type: Number,
        default: 1,
        min: [1, 'Street Number Street Number should be minimum 1!'],
      },
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePasswords = function (pass) {
  return bcrypt.compare(pass, this.password);
};

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hash = await bcrypt.hash(this.password, rounds);
      this.password = hash;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = model('User', userSchema);
