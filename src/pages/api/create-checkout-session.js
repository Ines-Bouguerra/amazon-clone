const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map(item => ({
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                description: item.description,
                images: [item.image],
            },
        },
        quantity: 1,
    }))
    try {

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            // shipping_rates: ['shr_1JZ2ZtSFM7YJ5X0X2QZ2YQZz'],
            // shipping_address_collection: {
            //     allowed_countries: ['GB', 'US', 'CA'],
            // },
            line_items: transformedItems,
            mode: 'payment',
            success_url: `${process.env.HOST}/success`,
            cancel_url: `${process.env.HOST}/checkout`,
            metadata: {
                email,
                images: JSON.stringify(items.map(item => item.image)),
            },
        })
        res.status(200).json({ id: session.id })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}