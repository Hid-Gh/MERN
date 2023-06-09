STATIC_DIR="../client"
STRIPE_PUBLISHABLE_KEY="pk_test_51MyDvmG7O3DYwbJcEObJUyFQX0GM0JCauJBy0lR4CGHuyoNvmtdvPkkQDLfxAFjhLEOodQBEdUSZrCbiQFieQZMq00MByw7ur8"
STRIPE_SECRET_KEY="sk_test_51MyDvmG7O3DYwbJcRm5Xj6sGWAY32I5CUDNq40lFiOeEHd3q8LuasIdZuZ4oHQsdd2VjEkgnW8BjYl2nNtnF71he00Je94JMDQ"

const stripe = require("stripe")(STRIPE_SECRET_KEY, {
            apiVersion: "2022-08-01",
          });
          
const getPublishableKey = (req, res) => {
            res.send({
              publishableKey:STRIPE_PUBLISHABLE_KEY,
            });
          }
          
const createPaymentIntent =  async (req, res) => {
            try {
              const paymentIntent = await stripe.paymentIntents.create({
                currency: "EUR",
                amount: 1999,
                automatic_payment_methods: { enabled: true },
              });
          
              // Send publishable key and PaymentIntent details to client
              res.send({
                clientSecret: paymentIntent.client_secret,
              });
            } catch (e) {
              return res.status(400).send({
                error: {
                  message: e.message,
                },
              });
            }
          }

          module.exports={
            getPublishableKey,
            createPaymentIntent
}