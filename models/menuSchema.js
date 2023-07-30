const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide dish name'],
      maxlength: [100, 'name can not be more than 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide dish price'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide dish description'],
      maxlength: [1000, 'description can not be more than 100 characters'],
    },

    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dzoy3xghm/image/upload/v1687270612/default-product-image_ysgdll.png',
    },
    category1: {
      type: String,
      required: [true, 'Please provide "Cuisine"'],
      enum: {
        values: [
          'italian',
          'greek',
          'spanish',
          'japanese',
          'indian',
          'american',
          'chinese',
        ],
        massage: '{VALUE} is not supported',
      },
    },
    category2: {
      type: String,
      required: [true, 'Please provide Dish type'],
      enum: {
        values: ['meals', 'noodles', 'breakfast', 'pizza', 'dinner', 'lunch'],
        massage: '{VALUE} is not supported',
      },
    },
    category3: {
      type: String,
      required: [true, 'Please provide food type'],
      enum: {
        values: ['veg', 'non-veg'],
        massage: '{VALUE} is not supported',
      },
    },
    category4: {
      type: String,
      required: [true, 'Please provide type of consumer'],
      enum: {
        values: ['Children', 'Adult'],
        massage: '{VALUE} is not supported',
      },
    },
    category5: {
      type: String,
      required: [true, 'Please provide type of Spices used'],
      enum: {
        values: [
          'hot spices',
          'mild spices',
          'bitter spices',
          'sweet spices',
          'aromatic spices',
        ],
        massage: '{VALUE} is not supported',
      },
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Menu', menuSchema)
