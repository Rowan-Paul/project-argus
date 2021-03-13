import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setNotice } from '../redux/main/actions'
const queryString = require('query-string')

function SuccesPageUI(props) {
  const [failed, setFailed] = useState('')

  useEffect(() => {
    const parsed = queryString.parse(props.location.search)

    if (parsed.redirect_status === 'failed') {
      setFailed(true)
      props.setNotice({ message: 'Payment failed', type: 'error' })
    } else if (parsed.redirect_status === 'success') {
      setFailed(false)
      props.setNotice({ message: 'Payment succeeded', type: 'success' })
    } else {
      props.history.push('/about/donate')
    }
  }, [props])

  return (
    <div className="p-10 pt-20 lg:p-20">
      <h1>
        {failed
          ? 'Your payment failed to complete however'
          : 'Thank you for donating!'}
      </h1>
      <Link to="/">Go to the homepage</Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const SuccesPage = connect(null, mapDispatchToProps)(SuccesPageUI)
