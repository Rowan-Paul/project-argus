import History from './history'

export default function Backdrop({ path, id, type }) {
  return (
    <div
      style={{
        background: `url(${path}) no-repeat center center`,
        backgroundSize: 'cover',
        minHeight: '300px',
      }}
      className="min-h-439 md:col-span-2 md:rounded-xl lg:rounded-2xl"
    >
      <History type="movies" id={id} />
    </div>
  )
}
