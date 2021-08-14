import MaterialIcon from '../lib/materialIcons'

export default function BackgroundOverlay({ onClick, icon, text }) {
  return (
    <div
      className="text-white bg-black bg-opacity-75 text-xs p-3 m-2 cursor-pointer inline-block"
      onClick={onClick}
    >
      <MaterialIcon request={icon} /> {text}
    </div>
  )
}
