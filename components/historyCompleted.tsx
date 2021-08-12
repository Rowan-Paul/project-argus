import MaterialIcon from '../lib/materialIcons'
import HistoryAddAgain from './historyAddAgain'
import HistoryAddSpecific from './historyAddSpecific'
import HistoryList from './historyList'

export default function HistoryCompleted({ type, id, session, history }) {
  return (
    <div className="text-white bg-black bg-opacity-75 text-xs p-3 m-2 inline-block divide-x-2 divide-solid">
      <MaterialIcon request="Check" /> Watched {history?.length} times
      <span className="ml-2">
        <HistoryAddAgain type={type} id={id} session={session} />
        <HistoryAddSpecific type={type} id={id} session={session} />
      </span>
      <HistoryList
        history={history}
        url={`/api/history/${session?.id}/${type}/${id}`}
      />
    </div>
  )
}
