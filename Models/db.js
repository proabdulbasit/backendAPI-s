import mongoose from "mongoose"
//mongoose.Promise = global.Promise ;
const db=`mongodb+srv://abobakar:abobakar786@fyp.ktjybxr.mongodb.net/testings`;
const db1=`mongodb://localhost:27017/FYP_database`;
export const connection=async()=>{ return await mongoose.connect(db).then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
}

//module.exports=connection;