import { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchBackdrop } from '../redux/main/actions'

function BackdropUI(props) {
  useEffect(() => {
    props.fetchBackdrop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex justify-end flex-col"
      style={{ backgroundImage: `url(${props.imgUrl})` }}
    >
      <span className="text-white bg-black bg-opacity-50 text-xs p-2">
        {props.imgName}
      </span>
    </div>
  )
}

const mapStateToProps = (state) => ({
  imgUrl: state.main.backdrop.imgUrl,
  imgName: state.main.backdrop.imgName,
})

const mapDispatchToProps = (dispatch) => ({
  fetchBackdrop: () => dispatch(fetchBackdrop()),
})

export const Backdrop = connect(mapStateToProps, mapDispatchToProps)(BackdropUI)
