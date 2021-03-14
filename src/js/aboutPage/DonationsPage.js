import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SmallInput } from '../components/inputFields/SmallInput'
import { SubmitButton } from '../components/inputFields/SubmitButton'
import {
  setCurrency,
  setAmount,
  setName,
  setEmail,
} from '../redux/donations/actions'
import { setNotice } from '../redux/main/actions'

function DonationsPageUI(props) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('eur')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const donateClicked = (e) => {
    e.preventDefault()
    if (document.getElementById('donateForm').checkValidity()) {
      document.getElementById('donateForm').reset()

      props.setAmount(amount)
      props.setCurrency(currency)
      props.setName(name)
      props.setEmail(email)

      switch (paymentMethod) {
        case 'card':
          props.history.push('/about/donate/checkout/card')
          break

        case 'ideal':
          props.history.push('/about/donate/checkout/ideal')
          break

        default:
          break
      }
    } else {
      console.log('Please fill in all fields')

      props.setNotice({
        message: 'Please fill in all fields',
        type: 'error',
      })
    }
  }

  return (
    <div className="p-10 pt-20 lg:p-20">
      <Link to="/about">Back to about</Link>
      <h1>Donations</h1>
      <p>
        Fill in the amount you wanna donate and select a payment method below.
      </p>
      <div className="lg:w-1/2">
        <form
          id="donateForm"
          className="mb-4 lg:flex lg:flex-wrap lg:justify-between"
        >
          <SmallInput
            name="Name"
            type="text"
            placeholder="John"
            required={true}
            onChange={(e) => setName(e)}
          />
          <SmallInput
            name="Email"
            type="email"
            placeholder="mail@example.com"
            required={true}
            onChange={(e) => setEmail(e)}
            last="true"
          />

          <div className="flex flex-col mb-4 lg:w-1/2">
            <label htmlFor="currency" className="block mb-2 font-bold">
              Choose a currency
            </label>
            <select
              name="currency"
              id="currency"
              onChange={(e) => setCurrency(e.target.value)}
              required
              className="mb-5 text-black border py-2 px-3 border-gray-500 dark:border-white"
            >
              <option value="eur">€</option>
              <option value="usd">US$</option>
            </select>
          </div>

          <SmallInput
            name="Amount"
            type="number"
            required={true}
            last="true"
            onChange={(e) => setAmount(e)}
          />

          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="paymentMethod" className=" mb-2 block font-bold">
              Payment method
            </label>
            <select
              name="paymentMethod"
              id="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
              className="block mb-5 text-black border py-2 px-3 border-gray-500 dark:border-white"
            >
              <option value="card">Credit Card</option>
              {currency.includes('eur') ? (
                <option value="ideal">iDEAL</option>
              ) : (
                ''
              )}
            </select>
          </div>

          <SubmitButton name={'Donate'} onClick={(e) => donateClicked(e)} />
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  setNotice: (notice) => dispatch(setNotice(notice)),
  setAmount: (amount) => dispatch(setAmount(amount)),
  setCurrency: (currency) => dispatch(setCurrency(currency)),
  setName: (name) => dispatch(setName(name)),
  setEmail: (email) => dispatch(setEmail(email)),
})

export const DonationsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DonationsPageUI)
