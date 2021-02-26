import { connect } from 'react-redux'
import { setNotice } from '../redux/main/actions'
import { useEffect, useState } from 'react'

function NoticeModalUI(props) {
  const [color, setColor] = useState('')
  const [position, setPosition] = useState('')

  useEffect(() => {
    switch (props.notice.type) {
      case 'error':
        setPosition('fixed')
        setColor('bg-red-400')
        break

      case 'success':
        setPosition('fixed')
        setColor('fixed bg-green-400')
        break

      default:
        setPosition('hidden')
        break
    }

    if (
      props.notice.message !== null &&
      Object.keys(props.notice).length > 0 &&
      props.constructor === Object
    ) {
      const waitToFade = setInterval(() => {
        props.setNotice({})
      }, 5000)

      return () => clearInterval(waitToFade)
    }
  })

  return (
    <div
      className={`${color} ${position} border m-2 lg:m-10 p-4 overflow-hidden bottom-0 cursor-pointer`}
      onClick={() => props.setNotice({})}
    >
      <span to="/" className="block text-center float-left">
        {props.notice.message}
      </span>
      <span className="block text-center ml-5 float-right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </div>
  )
}

const mapStateToProps = (state) => ({
  notice: state.main.notice,
})

const mapDispatchToProps = (dispatch) => ({
  setNotice: (notice) => dispatch(setNotice(notice)),
})

export const NoticeModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoticeModalUI)
