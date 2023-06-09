import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React from 'react'
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '../slices/basketSlice'

const CheckoutProduct = ({ id, title, price, description, category, image, rating, hasPrime }) => {
    
    const dispatch = useDispatch()
    const addItemToBasket = () => {
        const product = {
            id, title, price, description, category, image, rating, hasPrime
        }
        // Push item into basket
        // sending the product as an action to the REDUX store... the basket slice
        dispatch(addToBasket(product))
    }

    const removeItemFromBasket = () => {
        // Remove item from basket
        dispatch(removeFromBasket({ id }))
    }

    return (
        <div className='grid grid-cols-5' >
            <Image src={image} alt={title} height={200} width={200} />
            {/* middle */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <p className='mb-5'>${price}</p>
                {hasPrime && (
                    <div className='flex items-center space-x-2'>
                        <img loading='lazy' className='w-12' src="../images/prime.png" alt="prime logo" />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            {/* right */}
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addItemToBasket} >Add to Basket</button>
                <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
        </div>

    )
}

export default CheckoutProduct