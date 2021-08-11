export default function HistoryCounter({ type, id, data, error }) {
  if (!data) {
    return (
      <div className="block">
        <div className="text-white bg-black bg-opacity-75 text-xs p-4 m-2 inline-block">
          0 plays
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-red-700 font-bold ml-5">Something went wrong...</p>
    )
  }

  return (
    <div className="block">
      <div className="text-white bg-black bg-opacity-75 text-xs p-4 m-2 inline-block">
        {data?.length} play(s)
      </div>
    </div>
  )
}
