import HistoryPanel from '../history-panel/history-panel'
import Image from 'next/image'

interface IBackdropProps {
  path: string
  id?: number
  type: string
  showHistory: boolean
  poster: boolean
}

const Backdrop = (props: IBackdropProps): JSX.Element => {
  return (
    <div
      style={{
        background: props.path ? `url(${props.path}) no-repeat center center / cover` : '',
        minHeight: '300px',
      }}
      className={`-mx-5 md:col-span-6 md:rounded-2xl'} bg-accent`}
    >
      {props.showHistory ? <HistoryPanel type={props.type} id={props.id} /> : ''}
    </div>
  )
}

export default Backdrop
