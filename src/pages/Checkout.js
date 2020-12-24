import React from 'react'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51I1z5iD6YOEbtS1b4bzSEVVvNwTDdvoUPskV2IcW6OAGFjVE4mIvm9t5mQxtjqMFtYeBXnJ5dOgUBQQJ7yMGJ9S2000SzHgMJBsk_test_51I1z5iD6YOEbtS1b23LvANRN33I1FIA2i0dtJzwJYyUgtafZoAcoKthj4OmFmH8jk02dOiJ32O0KgjQnSsyMwsMi00QOzNoAGB');

    return ( <
        section className = "checkout-wrapper" >
        <
        AmplifyAuthenticator >
        <
        Elements stripe = { stripePromise } >
        <
        section >
        <
        h2 > Time to Checkout ? < /h2> <
        CheckoutForm / >
        <
        /section> < /
        Elements > <
        /AmplifyAuthenticator> < /
        section >
    )
}

export default Checkout