import History from './history/history'

export default function Backdrop({ path, id, type, showHistory }) {
  return (
    <div
      style={{
        background: `url(${path}) no-repeat center center / cover`,
        minHeight: '300px',
      }}
      className="min-h-439 md:col-span-2 md:rounded-xl lg:rounded-2xl"
    >
      {showHistory ? <History type={type} id={id} /> : ''}
    </div>
  )
}
