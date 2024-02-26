import mongoose from "mongoose"
//mongoose.Promise = global.Promise ;

const db=`mongodb+srv://dilipwannigamage:btFVeAwj0ImW4LkC@spotiviraldb.rkamkht.mongodb.net/?retryWrites=true&w=majority`

export const connection=async()=>{ return await mongoose.connect(db).then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
}

//module.exports=connection;