const mongoose = require('mongoose');
const campground = require('../models/campground');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places,descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"Connection Error:"));
db.once("open", () =>{
    console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0;i<500;i++){
        const price = Math.floor(Math.random()*20)+10;

        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            author: '5fd1fe6876bb4c049f1cc4cd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [ {
                url:'https://res.cloudinary.com/dqujg4tnh/image/upload/v1607955715/YelpCamp/uagfbazxjkzkxwxpkfbr.jpg',
                filename: 'YelpCamp/eicyhy7uoirlojmuh7xc' },
              { 
                url:'https://res.cloudinary.com/dqujg4tnh/image/upload/v1607953970/YelpCamp/vl7jpl14rn7ywxy10bfy.jpg',
                filename: 'YelpCamp/lzplqjzzvzmuigaayppd' } ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

