const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
