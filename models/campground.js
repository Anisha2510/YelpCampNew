const mongoose = require('mongoose');
const { campgroundSchema } = require('../schemas');
const review = require('./review');
const Schema = mongoose.Schema;


const imageSchema = new Schema({
    url: String,
    filename: String
});

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
})

const optn = { toJSON: { virtuals: true } };

const campGroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    geometry: {
        type: {
            type:String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type:[Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},optn);

campGroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`;
}) 


campGroundSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        await review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campGroundSchema);
