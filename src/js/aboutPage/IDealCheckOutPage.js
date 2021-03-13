import React, { useState, useEffect } from 'react'
import {
  IdealBankElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setNotice } from '../redux/main/actions'

function IDealCheckOutPageUI(props) {
  const [disabled, setDisabled] = useState(true)
  const [clientSecret, setClientSecret] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('')
  const stripe = useStripe()
  const elements = useElements()

  let api = 'http://localhost:3000/api/v1'
  if (process.env.NODE_ENV === 'production') {
    api = 'https://api.projectarg.us/api/v1'
  }

  let client = 'http://localhost:3001'
  if (process.env.NODE_ENV === 'production') {
    client = 'https://projectarg.us'
  }

  useEffect(() => {
    setAmount(props.amount * 100)
    setCurrency(props.currency)

    if ((amount > 0 && currency === 'usd') || currency === 'eur') {
      // Create PaymentIntent as soon as the page loads
      window
        .fetch(`${api}/checkout/ideal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount,
            currency: currency,
          }),
        })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          setClientSecret(data.clientSecret)
        })
    }
  }, [api, currency, amount, props.amount, props.currency])

  const IDEAL_ELEMENT_OPTIONS = {
    // Custom styling can be passed to options when creating an Element
    style: {
      base: {
        padding: '10px 12px',
        color: '#32325d',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  }

  const handleChange = async (event) => {
    setDisabled(event.empty)
    props.setNotice(
      event.error ? { message: event.error.message, type: 'error' } : ''
    )
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!document.getElementById('idealForm').checkValidity()) {
      props.setNotice({ message: 'Please fill in all fields', type: 'error' })
    }

    if (!stripe || !elements || !clientSecret) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setDisabled(true)
      return
    }

    const { error } = await stripe.confirmIdealPayment(clientSecret, {
      payment_method: {
        ideal: elements.getElement(IdealBankElement),
        billing_details: {
          name: props.name,
        },
      },
      return_url: `${client}/about/donate/checkout`,
    })

    if (error) {
      props.setNotice({ message: error.message, type: 'error' })
    }

    // Otherwise the customer will be redirected away from your
    // page to complete the payment with their bank.
  }

  return (
    <div className="p-10 pt-20 lg:p-20">
      <Link to="/about/donate">Change payment details</Link>
      <h1>Checkout</h1>
      <p>
        You want to donate {props.amount} {props.currency}
      </p>
      <form
        id="idealForm"
        onSubmit={handleSubmit}
        className="w-full lg:w-1/3 dark:bg-white rounded mb-5 p-1 lg:p-10"
      >
        <label className="font-bold">
          iDEAL Bank
          <IdealBankElement
            id="IdealBankElement"
            options={IDEAL_ELEMENT_OPTIONS}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={!stripe || disabled} className="mt-5">
          Submit Payment
        </button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({
  amount: state.main.payment.amount,
  currency: state.main.payment.currency,
  naeme: state.main.payment.currency,
})

const mapDispatchToProps = (dispatch) => ({
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const IDealCheckOutPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(IDealCheckOutPageUI)
