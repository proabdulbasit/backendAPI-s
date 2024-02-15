
const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;

import stripe from ('stripe')(STRIPE_SECRET_KEY)


const payment = async(req,res)=>{

    try {

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: STRIPE_PUBLISHABLE_KEY,
        name: 'Sandeep Sharma',
        address: {
            line1: '115, Vikas Nagar',
            postal_code: '281001',
            city: 'Mathura',
            state: 'Uttar Pradesh',
            country: 'India',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: req.body.amount,     // amount will be amount*100
            description: req.body.productName,
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.redirect("/success")
    })
    .catch((err) => {
        res.redirect("/failure")
    });


    } catch (error) {
        console.log(error.message);
    }

}

const success = async(req,res)=>{

    try {
        
        res.render('success');

    } catch (error) {
        console.log(error.message);
    }

}

const failure = async(req,res)=>{

    try {
        
        res.render('failure');

    } catch (error) {
        console.log(error.message);
    }

}

export {
    payment,
    success,
    failure
}