import History from './history/history'
import MaterialIcon from '../lib/materialIcons'

export default function Backdrop({ path, id, type, showHistory, poster }) {
  return (
    <div
      style={{
        background: `url(${path}) no-repeat center center / cover`,
        minHeight: '300px',
      }}
      className={`min-h-439 ${
        poster
          ? 'md:col-span-2 lg:col-span-1'
          : 'md:col-span-2 lg:col-span-4 md:rounded-xl lg:rounded-2xl'
      }`}
    >
      {showHistory ? <History type={type} id={id} /> : ''}
    </div>
  )
}

export function BackdropOverlay({ onClick, icon, text }) {
  return (
    <div
      className="text-white bg-black bg-opacity-75 text-xs p-3 m-2 cursor-pointer inline-block"
      onClick={onClick}
    >
      <MaterialIcon request={icon} /> {text}
    </div>
  )
}
