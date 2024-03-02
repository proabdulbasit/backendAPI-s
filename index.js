const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { emailsender } = require('./Utility/MailSend.js');
const { apiRoute } = require('./Router/PaymentRoutes.js');
const { TeamMessage } = require('./Utility/TeamMessage.js');
const { ClientMessage } = require('./Utility/ClientMessage.js');
const { FreePromoMessage } = require('./Utility/FreePromoMessage.js');
const { getUser, deleteUser } = require('./Controller/User.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', apiRoute);

const db = "mongodb+srv://dilipwannigamage:btFVeAwj0ImW4LkC@spotiviraldb.rkamkht.mongodb.net/?retryWrites=true&w=majority";

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

// Middleware to handle email sending
app.post('/sendmail', async (req, res) => {
    try {
        const { strip_id, email } = req.body;
        let userData = await getUser(strip_id);
        if (userData) {
            const message1 = ClientMessage(userData.email, userData.UserData.song_details, userData.UserData.order_detail);
            await emailsender(userData.email, message1);
            const message2 = TeamMessage(userData.email, userData.UserData.song_details, userData.UserData.order_detail);
            await emailsender("spotiviral@gmail.com", message2, "Customer Order Details - Spotify Promotion");
            deleteUser(strip_id);
        }
        res.send(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

// Route to handle contact form submissions
app.post('/contact', async (req, res) => {
    try {
        const { email, msg } = req.body;
        const result = await emailsender("spotiviral@gmail.com", msg, "Contact Form Submission");
        if (result) {
            res.json({ message: 'Email sent successfully!', success: true });
        } else {
            res.status(500).json({ message: 'Failed to send email.', success: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

// Route to handle free promotion requests
app.post('/freepromotion', async (req, res) => {
    try {
        const { email, name, howDidYouFindUs, spotifyTrackLink, amountOfPlays } = req.body;
        const message = FreePromoMessage(email, name, howDidYouFindUs, spotifyTrackLink, amountOfPlays);
        const result = await emailsender("spotiviral@gmail.com", message, "Free Promotion");
        if (result) {
            res.json({ message: 'Email sent successfully!' });
        } else {
            res.status(500).json({ message: 'Failed to send email.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});
app.get('/test', (req, res) => {
    res.send('Hello World');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}`);
});
