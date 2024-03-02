const mongoose = require("mongoose");

const db = "mongodb+srv://dilipwannigamage:btFVeAwj0ImW4LkC@spotiviraldb.rkamkht.mongodb.net/?retryWrites=true&w=majority";
// const db = "mongodb+srv://basit:admin@cluster0.w54f2vf.mongodb.net/";

const connection = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connection;
