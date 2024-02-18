import express from 'express'
import cors from 'cors'
import  {emailsender} from './Utility/MailSend.js'
import {apiRoute} from './Router/PaymentRoutes.js'
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
  const { email, msg } = req.body;
  const result = await emailsender(email, msg);
  if (result) {
    res.json({ message: 'Email sent successfully!' });
  } else {
    res.status(500).json({ message: 'Failed to send email.' });
  }
});
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});