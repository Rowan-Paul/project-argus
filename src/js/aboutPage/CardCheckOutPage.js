import { useState, useEffect } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { connect } from 'react-redux'
import { setNotice } from '../redux/main/actions'
import { Link, withRouter } from 'react-router-dom'

function CardCheckOutPageUI(props) {
  const [succeeded, setSucceeded] = useState(false)
  // eslint-disable-next-line
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState('')
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

  useEffect(() => {
    setAmount(props.amount * 100)
    setCurrency(props.currency)

    if ((amount > 0 && currency === 'usd') || currency === 'eur') {
      // Create PaymentIntent as soon as the page loads
      window
        .fetch(`${api}/checkout/card`, {
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

  const cardStyle = {
    style: {
      base: {
        color: '#000000',
        fontFamily: 'Roboto, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#000000',
        },
      },
      invalid: {
        color: '#F87171',
        iconColor: '#F87171',
      },
    },
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty)
    props.setNotice(
      event.error ? { message: event.error.message, type: 'error' } : ''
    )
    setError(event.error ? event.error.message : '')
    setProcessing(false)
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: props.name,
          email: props.email,
        },
      },
      receipt_email: props.email,
    })

    if (payload.error) {
      props.setNotice({
        message: `Payment failed ${payload.error.message}`,
        type: 'error',
      })
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      props.setNotice({ message: 'Payment succeeded', type: 'success' })
      setError(null)
      setProcessing(false)
      setSucceeded(true)

      props.history.push(
        '/about/donate/checkout?type=card&redirect_status=success'
      )
    }
  }

  return (
    <div className="p-10 pt-20 md:p-20">
      <Link to="/about/donate">Change payment details</Link>
      <h1>Checkout</h1>
      <p>
        You want to donate {props.amount} {props.currency}
      </p>

      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="w-full md:w-1/3 dark:bg-white rounded mb-5 p-1 md:p-10"
      >
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
          className="rounded-t-lg p-3 border-1 border-black max-h-11 w-full bg-white box-border"
        />

        <button
          disabled={processing || disabled || succeeded}
          id="submit"
          className="bg-black text-white rounded-b-lg border-0 py-3 px-4 font-bold cursor-pointer block transform w-full"
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
      </form>
      {/* Show a success message upon completion */}
      <p className={succeeded ? '' : 'hidden'}>Thank you for donating</p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  amount: state.donations.payment.amount,
  currency: state.donations.payment.currency,
  name: state.donations.payment.name,
  email: state.donations.payment.email,
})

const mapDispatchToProps = (dispatch) => ({
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const CardCheckOutPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CardCheckOutPageUI))
