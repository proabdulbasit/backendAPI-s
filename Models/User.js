const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    strip_id: {
        type: String,
    },
    UserData: {
        type: Object,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
