import AddSpecific from './addSpecific'
import Add from './add'

export default function OverviewNew({ type, id, session }) {
  return (
    <div className="text-white bg-black bg-opacity-50 text-xs p-3 m-2 inline-block">
      <AddSpecific type={type} id={id} session={session} />
      <Add type={type} id={id} session={session} text={true} />
    </div>
  )
}
