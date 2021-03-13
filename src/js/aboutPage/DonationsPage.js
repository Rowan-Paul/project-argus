import { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { SmallInput } from '../components/inputFields/SmallInput'
import { SubmitButton } from '../components/inputFields/SubmitButton'
import { setCurrency, setAmount, setNotice } from '../redux/main/actions'

function DonationsPageUI(props) {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('eur')

  const donateClicked = (e) => {
    e.preventDefault()
    if (document.getElementById('donateForm').checkValidity()) {
      document.getElementById('donateForm').reset()

      props.setAmount(amount)
      props.setCurrency(currency)
      props.history.push('/about/donate/checkout/card')
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
        <form id="donateForm" className="mb-4">
          <SmallInput
            name="Amount"
            type="number"
            required={true}
            onChange={(e) => setAmount(e)}
          />

          <label htmlFor="currency" className="mb-2 block font-bold">
            Choose a currency
          </label>
          <select
            name="currency"
            id="currency"
            onChange={(e) => setCurrency(e.target.value)}
            className="block mb-5 text-black border py-2 px-3 border-gray-500 dark:border-white"
          >
            <option value="eur">€</option>
            <option value="usd">US$</option>
          </select>

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
})

export const DonationsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DonationsPageUI)
