const User = require("../Models/User.js");

const createUser = async (data) => {
    const user = new User({ email: data.email, strip_id: data.strip_id, UserData: data });
    return await user.save();
};

const getUser = async (data) => {
    return await User.findOne({ strip_id: data });
};

const deleteUser = async (data) => {
    console.log("user delete");
    return await User.deleteOne({ strip_id: data });
};

module.exports = { createUser, getUser, deleteUser };
