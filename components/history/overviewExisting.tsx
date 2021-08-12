import MaterialIcon from '../../lib/materialIcons'
import Add from './add'
import AddSpecific from './addSpecific'
import List from './listHistory'

export default function OverviewExisting({ type, id, session, history }) {
  return (
    <div className="text-white bg-black bg-opacity-75 text-xs p-3 m-2 inline-block divide-x-2 divide-solid">
      <MaterialIcon request="Check" /> Watched {history?.length} times
      <span className="ml-2">
        <Add type={type} id={id} session={session} text={false} />
        <AddSpecific type={type} id={id} session={session} />
      </span>
      <List
        history={history}
        url={`/api/history/${session?.id}/${type}/${id}`}
      />
    </div>
  )
}
