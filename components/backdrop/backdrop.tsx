import HistoryPanel from '../history-panel/history-panel'

interface IBackdropProps {
  path: string
  id: number
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
      className={`-mx-5 ${props.poster ? 'md:col-span-2 lg:col-span-1' : 'md:col-span-6 md:rounded-2xl'} bg-accent`}
    >
      {props.showHistory ? <HistoryPanel type={props.type} id={props.id} /> : ''}
    </div>
  )
}

export default Backdrop
