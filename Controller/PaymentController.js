const stripePackage = require("stripe");
const { emailsender } = require("../Utility/MailSend.js");
const { TeamMessage } = require("../Utility/TeamMessage.js");
const { ClientMessage } = require("../Utility/ClientMessage.js");
const { createUser } = require("./User.js");

const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51IpqnXEhDFzZqzWxhGO9vlehG0gUfdXnK188GsI9OlnI0ugDTo04yAqjOSayV69cEUpiYMNpIyFlL8QxXzJi6vZq00GGtlpWhJ";
const STRIPE_SECRET_KEY =
  "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";

const stripe = stripePackage(STRIPE_SECRET_KEY);

const payment = async (req, res) => {
  console.log(req.body);

  const lineItems = req.body.order_detail.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.order_name + " : " + item.order_package,
          description:
            req.body.song_details
              .map((song, index) => " (" + (index + 1) + ") " + song.name + " ")
              .join(":") || "song url",
        },
        unit_amount: Math.max(item.price * 100, 50),
      },
      quantity:
        item.order_name == "spotify-plays" ? req.body.song_details.length : 1,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/sucess",
      cancel_url: "http://localhost:3000/cancel",
    });

    req.body.strip_id = session.id;
    await createUser(req.body);

    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
};

const success = async (req, res) => {
  try {
    res.send("success");
  } catch (error) {
    console.log(error.message);
  }
};

const failure = async (req, res) => {
  try {
    res.send("failure");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { payment, success, failure };
