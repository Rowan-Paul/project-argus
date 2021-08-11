import MaterialIcon from '../lib/materialIcons'

export default function HistoryList({ history }) {
  const handleClick = () => {
    console.log(history)
  }

  return (
    <span onClick={handleClick} className="ml-2 pl-2 cursor-pointer">
      <MaterialIcon request="ViewList" />
    </span>
  )
}
