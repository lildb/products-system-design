import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: {type: String, default: "0"},
  features: [
    {
      feature: String,
      value: String,
    }
  ],

});

const styleSchema = new Schema({
  product_id: Number,
  results: [
      {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        }
      ],
      skus: {
        "37": {             // what to call this?
          quanity: Number,
          size: String,
        },
      },
    }
  ],
});

const relatedSchema = new Schema({
  product_id: Number,
  related_id: [ Number ],
});

