import React from 'react'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import moment from 'moment'
import db from '../../firebase'
import Order from '../components/Order'
import { collection, orderBy, getDocs } from 'firebase/firestore';


const orders = (orders) => {
    const { data: session } = useSession()

    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>
                    Your Orders
                </h1>
                {session ? (
                    <h2> {orders.orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}
                <div className='mt-5 space-y-4'>
                    {orders.orders.map((
                        { id, amount, amount_shipping, images, timestamp, items }
                    ) => (
                        <Order
                            key={id}
                            id={id}
                            amount={amount}
                            amount_shipping={amount_shipping}
                            images={images}
                            timestamp={timestamp}
                            items={items}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default orders

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    // Get the users logged in credentials...
    const session = await getSession(context)

    if (!session) {
        return {
            props: {}
        }
    }

    // Firebase DB
    const ordersRef = collection(db, 'users', session.user.email, 'orders');
    const stripeOrders = await getDocs(ordersRef);

    // Stripe Orders
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amount_shipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(
                order.data().timestamp.toDate()
            ).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(
                    order.id, {
                    limit: 100,
                })
            ).data,
        }))
    )

    return {
        props: {
            orders,
        }
    }
}