import User from "../Models/User.js";

export const createUser = async (data) => {
  const user = new User({email:data.email,UserData:data});
  return await user.save();
};

export const getUser = async (data) => {
  return await User.findOne({ email: data });
};

export const deleteUser = async (data) => {
  console.log("user delete")
  return await User.deleteOne({ email: data });
};
