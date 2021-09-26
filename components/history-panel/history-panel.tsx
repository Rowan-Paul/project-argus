import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'

import { arraysEqual } from '../../lib/utils'
import AddItem from './add-item'
import AddItemModal from './add-item-modal'
import Loading from '../loading/loading'
import HistoryModal from './history-modal'

const fetcher = async (input: RequestInfo, init: RequestInit, ...args: any[]) => {
  const res = await fetch(input, init)
  return res.json()
}

interface IHistoryProps {
  type: string
  id: number
}

const HistoryPanel = (props: IHistoryProps): JSX.Element => {
  const [history, setHistory] = useState<any[]>()
  const [shouldFetch, setShouldFetch] = useState<boolean>()
  const { status } = useSession()
  const { data, error, isValidating } = useSWR(
    status === 'authenticated' ? `/api/history/${props.type}/${props.id}` : null,
    fetcher
  )

  useEffect(() => {
    if (!arraysEqual(data, history) || data === undefined) {
      setHistory(data)
    }
  }, [data, history])

  if (isValidating) {
    return (
      <div className="text-white bg-black bg-opacity-50 text-xs p-2 m-2 inline-block">
        <Loading small={true} />
        <span className="pl-2">Loading history</span>
      </div>
    )
  }

  if (history?.length > 0) {
    if (error && history?.length > 0) {
      setHistory([])
    }

    return (
      <div className="text-white bg-black bg-opacity-75 text-xs p-3 m-2 inline-block divide-x-2 divide-solid">
        <span>
          <Image src="/assets/svg/check.svg" width="16px" height="16px" alt="Check" />
          <span className="align-top">Watched {history?.length} times</span>
        </span>
        <span className="ml-2">
          <AddItem type={props.type} id={props.id} text={false} session={status === 'authenticated' ? true : false} />
          <AddItemModal type={props.type} id={props.id} session={status === 'authenticated' ? true : false} />
        </span>
        <HistoryModal history={history} url={`/api/history/${props.type}/${props.id}`} />
      </div>
    )
  }

  return (
    <div className="text-white bg-black bg-opacity-50 text-xs p-2 m-2 inline-block">
      <AddItemModal type={props.type} id={props.id} session={status === 'authenticated' ? true : false} />
      <AddItem type={props.type} id={props.id} text={true} session={status === 'authenticated' ? true : false} />
    </div>
  )
}

export default HistoryPanel
