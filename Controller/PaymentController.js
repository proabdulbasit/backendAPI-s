
const STRIPE_PUBLISHABLE_KEY="pk_test_51OiAn0H4tDig07HMkiKshs29sCYHhqImupGA4fROYbfgJFSWBZIYwbRhcqKBezTXEVr3AFvgdGDCeZw42HhZ5YhO00ukAr3Ogb"
const  STRIPE_SECRET_KEY  = "sk_test_51OiAn0H4tDig07HMZRNjoOjIssqnO8V77thQHgGDS2dT5K6XloSl7yi8udm96vE4CwukoBXytbQq9k8hWNpvBnTx00hcbqI7aV"

import stripePackage from 'stripe';
const stripe = stripePackage(STRIPE_SECRET_KEY);
import {emailsender} from '../Utility/MailSend.js'
 import {TeamMessage} from '../Utility/TeamMessage.js'
 import {ClientMessage} from '../Utility/ClientMessage.js'
 import { createUser } from './User.js';
const payment = async(req,res)=>{
     console.log(req.body)

//  res.send(req.body)

 const lineItems=req.body.order_detail.map(item=>{
    return{
        price_data:{
            currency:"usd",
            product_data:{
                name:req.body.song_name+"  --> "+item.order_name+" : "+item.order_package,
                // images:[item.imgdata],
                description:req.body.song_url||"song url",
            },
            unit_amount:Math.max(item.price * 100, 50),
        },
        quantity:1
    }
 })
    try {
      //  console.log(STRIPE_SECRET_KEY)
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:"http://localhost:3000/sucess",
            cancel_url:"http://localhost:3000/cancel",
        });
    
await createUser(req.body)
      //  let messge=ClientMessage(req.body.song_name,req.body.total_price,req.body.order_detail)
      //  emailsender(req.body.client_email,messge,"Order Confirmation: Spotify Promotion")

        res.json({id:session.id})


    } catch (error) {
        console.log(error);
    }

}

const success = async(req,res)=>{

    try {
        
        res.send('success');

    } catch (error) {
        console.log(error.message);
    }

}

const failure = async(req,res)=>{

    try {
        
        res.send('failure');

    } catch (error) {
        console.log(error.message);
    }

}

export {
    payment,
    success,
    failure
}