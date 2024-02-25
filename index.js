import express from 'express'
import cors from 'cors'
import  {emailsender} from './Utility/MailSend.js'
import {apiRoute} from './Router/PaymentRoutes.js'
import {TeamMessage} from './Utility/TeamMessage.js'
import {ClientMessage} from './Utility/ClientMessage.js'
import {connection} from "./Models/db.js"
import { getUser,deleteUser } from './Controller/User.js'
const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors());
app.use('/api',apiRoute)
// Define your routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/sendmail', async (req, res) => {
 try {
  //console.log(req.body)
  const { email, msg } = req.body;
 let userData=await getUser(email)
 //console.log("userData ",userData)
 if(userData)
 {

   const message1=ClientMessage(userData.email,userData.UserData.song_details,userData.UserData.order_detail)
   await emailsender(userData.email,message1)
    const message2=TeamMessage(userData.email,userData.UserData.song_details,userData.UserData.order_detail)
    await emailsender("dilip.wannigamage@gmail.com",message2,"Customer Order Details - Spotify Promotion")
   deleteUser(email)

 }

  res.send(req.body)
  //const result = await emailsender(email, msg);
  // if (result) {
  //   res.json({ message: 'Email sent successfully!' });
  // } else {
  //   res.status(500).json({ message: 'Failed to send email.' });
  // }
 } catch (error) {
  console.log(error)
  res.status(500).json({ message: 'Failed to send email.' });

 }
});

app.post('/contact', async (req, res) => {
  try {
   //console.log(req.body)
   const { email, msg } = req.body;
   const result = await emailsender(email, msg, "Contact Form Submission");
   if (result) {
     res.json({ message: 'Email sent successfully!' });
   } else {
     res.status(500).json({ message: 'Failed to send email.' });
   }
  } catch (error) {
   console.log(error)
   res.status(500).json({ message: 'Failed to send email.' });
 
  }
 })

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT,async () => {
  await connection()
  console.log(`Server is running on port ${PORT}`);
});