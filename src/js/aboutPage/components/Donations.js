import { Link } from 'react-router-dom'

function DonationsUI() {
  return (
    <div className="mb-10">
      <h2>Donations</h2>
      <p>
        If you wish to help pay for the server or just buy me a cup of tea (I
        don't drink coffee), you can do so by donating here using credit card,
        iDeal or PayPal. No matter the price, your donation helps me stay
        interested and is always appreciated!{' '}
        <Link to="/about/donate">Make a donation on this page</Link>.
      </p>
    </div>
  )
}

export const Donations = DonationsUI
