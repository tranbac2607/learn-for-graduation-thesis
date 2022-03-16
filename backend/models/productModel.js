const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter product Name']
    },
    description: {
        type: String,
        require: [true, 'Please enter product Description']
    },
    price: {
        type: Number,
        require: [true, 'Please enter product Price'],
        maxLenght: [8, 'Please enter product name less than 8 characters']
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            }
        }
    ],
    category: {
        type: String,
        require: [true, 'Please enter product Category']
    },
    Stock: {
        type: Number,
        require: [true, 'Please enter product Stock'],
        maxLenght: [4, 'Please enter product name less than 4 characters'],
        default: 1
    },
    numberOfReview: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                require: true
            },
            rating: {
                type: String,
                require: true
            },
            comment: {
                type: String,
                require: true
            }
        }
    ],
    creatAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prodcut', productSchema);