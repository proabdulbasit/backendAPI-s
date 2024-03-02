const FreePromoMessage = (email, name, howDidYouFindUs, spotifyTrackLink, amountOfPlays) => {
    let date = new Date();

    return `<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation: Spotify Promotion</title>
    <style>
      body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
      }
      .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #f9f9f9;
      }
      h1, h2, p {
          margin: 0;
      }
      h1 {
          color: #333;
      }
      .details {
          margin-top: 20px;
      }
      .details p {
          margin: 5px 0;
      }
      .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 0.8em;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Order Confirmation: Spotify Promotion</h1>
      <div class="details">
          <p>Dear Spotiviral Team</p>
          <p>Please find below the details of a recent order for Spotify promotion.</p>
          <p>Ordered Date: ${date}</p>
          <p>Customer Name ${name}</p>
          <p>Customer Email ${email}</p>
          <p>How did you find us: ${howDidYouFindUs}</p>
          <p>Spotify Track Link: ${spotifyTrackLink}</p>
          <p>Amount of Plays: ${amountOfPlays}</p>
         
          <p>We're committed to delivering results swiftly. Expect completion within 24 to 48 hours.</p>
          <p>For any questions, don't hesitate to contact us.</p>
      </div>
      <div class="footer">
          <p>Best regards,</p>
          <p>Spotiviral Team</p>
      </div>
    </div>
    </body>
    </html>`;
};

module.exports = FreePromoMessage;
