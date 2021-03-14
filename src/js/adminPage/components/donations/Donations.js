import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchDonations } from '../../../redux/donations/actions'
import { DonationsModal } from './DonationsModal'

function DonationsUI(props) {
  const [position, setPosition] = useState('hidden')

  useEffect(() => {
    props.fetchDonations()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setPosition('hidden')
      }
    })

    document.addEventListener(
      'click',
      function (event) {
        if (
          (!event.target.closest('#modal') &&
            !event.target.closest('#button')) ||
          event.target.closest('#crossIcon')
        ) {
          setPosition('hidden')
        }
      },
      false
    )
  }, [props])

  if (props.donations.length > 0) {
    return (
      <div className="mb-10">
        <h2>Donations</h2>
        <p>Here you can see the latest donations from users.</p>

        <span
          className="underline cursor-pointer"
          id="button"
          onClick={() => setPosition('fixed')}
        >
          See the last donation by {props.donations[0].name} and more.
        </span>

        <DonationsModal
          position={position}
          id="modal"
          setPosition={() => setPosition('hidden')}
        />
      </div>
    )
  }

  return (
    <div className="mb-5">
      <h2>Donations</h2>
      <p>Here you can see the latest donations from users.</p>
      <span>There are no donations yet!</span>
    </div>
  )
}

const mapStateToProps = (state) => ({
  donations: state.donations.donations,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDonations: () => dispatch(fetchDonations()),
})

export const Donations = connect(
  mapStateToProps,
  mapDispatchToProps
)(DonationsUI)
