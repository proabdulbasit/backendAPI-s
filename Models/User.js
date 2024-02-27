import mongoose from "mongoose";
const userSchema = mongoose.Schema({
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

const user = mongoose.model("user", userSchema);
export default user;
