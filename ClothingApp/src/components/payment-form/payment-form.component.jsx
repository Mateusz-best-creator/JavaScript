import React, {useState} from 'react';
// redux selector hook
import { useSelector } from 'react-redux';
import {selectCartTotal} from '../../store/cart/cart.selector';
import {selectCurrentUser} from '../../store/user/user.selector';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// CardElement => is an credit card input
import {BUTTON_TYPES_CLASSES} from "../button/button.component";

// styled components
import {
    PaymentFormContainer,
    FormContainer,
    PaymentButton,
} from './payment-form.styles';

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        setIsProcessingPayment(true);
        // fetch request to our backend
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount*100 })
        }).then(res => res.json());

        const {paymentIntent: {client_secret}} = response;

        // create actual payment
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card:elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error) {
            console.log(paymentResult.error)
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successfull')
            }
        }
    }

    return (
        <>
            <PaymentFormContainer>
                <FormContainer onSubmit={paymentHandler}>
                    <h2>Credit Card Payment: </h2>
                    <CardElement />
                    <PaymentButton 
                        isLoading={isProcessingPayment} 
                        buttonType={BUTTON_TYPES_CLASSES.inverted}> 
                            Pay now
                    </PaymentButton>
                </FormContainer>
            </PaymentFormContainer>
            <div style={{marginTop: '-20px'}}>
                <h5>For cart number please enter <span style={{color: 'red'}}>4242 4242 4242 4242</span>.</h5>
                <h5>For date please enter future date, for example: <span style={{color: 'red'}}>04 55</span>.</h5>
                <h5>CVC code can be anything, for example <span style={{color: 'red'}}>222 22222</span>.</h5>
            </div>
        </>
    )
}

export default PaymentForm;