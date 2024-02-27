import User from "../Models/User.js";

export const createUser = async (data) => {
  const user = new User({email:data.email,strip_id:data.strip_id,UserData:data});
  return await user.save();
};

export const getUser = async (data) => {
  return await User.findOne({ strip_id: data });
};

export const deleteUser = async (data) => {
  console.log("user delete")
  return await User.deleteOne({ strip_id: data });
};
