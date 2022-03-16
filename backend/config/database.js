const moongoose = require('mongoose');

async function connectDatabase() {

    try {
        await moongoose.connect('mongodb://localhost:27017/Ecomerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect fail');
    }
}

module.exports = { connectDatabase };