import Stripe from "stripe";
//https://www.youtube.com/watch?v=1r-F3FIONl8
const stripe = new Stripe(process.env.STRIPE_SECRET);

export default stripe;
